import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getShopProductByIdentifier } from "@/lib/printful";

export const dynamic = "force-dynamic";

const cartItemSchema = z.object({
  id: z.union([z.string(), z.number()]),
  quantity: z.number().int().positive(),
  variant: z.string().optional(),
  size: z.string().optional(),
  color: z.string().optional(),
  printfulVariantId: z.number().int().positive().optional(),
});

const checkoutRequestSchema = z.object({
  items: z.array(cartItemSchema).min(1),
});

function toMinorUnits(amount: number) {
  return Math.round(amount * 100);
}

function getSuccessUrl(origin: string) {
  return `${origin}/shop?checkout=success`;
}

function getCancelUrl(origin: string) {
  return `${origin}/shop?checkout=cancelled`;
}

export async function POST(request: NextRequest) {
  const origin = request.nextUrl.origin;
  const secretKey = process.env.STRIPE_SECRET_KEY;

  let payload: z.infer<typeof checkoutRequestSchema>;

  try {
    payload = checkoutRequestSchema.parse(await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid cart payload." }, { status: 400 });
  }

  const lineItems = payload.items.map((item) => {
    const product = getShopProductByIdentifier(String(item.id));

    if (!product) {
      throw new Error(`Unknown product: ${item.id}`);
    }

    return {
      quantity: item.quantity,
      price: product.price,
      name: product.name,
      description: product.description,
      variant: item.variant,
      size: item.size,
      color: item.color,
      printfulVariantId: item.printfulVariantId,
      category: product.category,
    };
  });

  try {
    if (!secretKey) {
      return NextResponse.json({
        preview: true,
        url: getSuccessUrl(origin),
      });
    }

    const form = new URLSearchParams();
    form.set("mode", "payment");
    form.set("success_url", getSuccessUrl(origin));
    form.set("cancel_url", getCancelUrl(origin));
    form.set("billing_address_collection", "required");
    form.set("shipping_address_collection[allowed_countries][0]", "US");
    form.set("metadata[cart]", JSON.stringify(payload.items));

    lineItems.forEach((item, index) => {
      const amount = toMinorUnits(item.price);
      form.set(`line_items[${index}][quantity]`, String(item.quantity));
      form.set(`line_items[${index}][price_data][currency]`, "usd");
      form.set(`line_items[${index}][price_data][unit_amount]`, String(amount));
      form.set(`line_items[${index}][price_data][product_data][name]`, item.name);
      form.set(
        `line_items[${index}][price_data][product_data][description]`,
        item.description,
      );
      form.set(
        `line_items[${index}][price_data][product_data][metadata][category]`,
        item.category,
      );

      if (item.printfulVariantId) {
        form.set(
          `line_items[${index}][price_data][product_data][metadata][printfulVariantId]`,
          String(item.printfulVariantId),
        );
      }
    });

    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form.toString(),
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        { error: "Stripe checkout session failed.", details: text },
        { status: 502 },
      );
    }

    const session: { url?: string } = await response.json();

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL." },
        { status: 502 },
      );
    }

    return NextResponse.json({ preview: false, url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Checkout failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
