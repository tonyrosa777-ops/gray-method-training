import { NextResponse, type NextRequest } from "next/server";
import {
  getShopProductByIdentifier,
  getVariantOptions,
} from "@/lib/printful";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const product = getShopProductByIdentifier(id);

  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  const variants = await getVariantOptions(id);

  return NextResponse.json({
    product: {
      id: product.id,
      slug: product.slug,
      name: product.name,
      category: product.category,
      fulfillment: product.fulfillment,
      price: product.price,
    },
    variants,
    source: product.printfulProductId ? "live-or-seeded" : "seeded",
  });
}
