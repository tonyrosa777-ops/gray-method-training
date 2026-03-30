import seededCatalog from "@/lib/printful-seeded-products.json";
import {
  products,
  type Product,
} from "@/data/shop";

const PRINTFUL_API_BASE = "https://api.printful.com";

export interface SeededPrintfulProduct {
  slug: string;
  name: string;
  printful_id: number;
  price: number;
  category: string;
  preview_image_url: string;
}

export interface SeededPrintfulCatalog {
  storeId: number;
  products: SeededPrintfulProduct[];
}

export interface PrintfulCatalogProduct {
  id: number;
  main_category_id: number;
  type: string;
  type_name: string;
  title: string;
  brand: string | null;
  model: string | null;
  image: string;
  variant_count: number;
  currency: string;
  files: unknown[];
  options: unknown[];
  is_discontinued: boolean;
  avg_fulfillment_time: number | null;
  description: string;
  techniques: unknown[];
  origin_country: string | null;
}

export interface PrintfulCatalogVariant {
  id: number;
  product_id: number;
  name: string;
  size: string;
  color: string;
  color_code: string;
  color_code2: string | null;
  image: string;
  price: string;
  in_stock: boolean;
}

export interface CatalogVariantResponse {
  id: number;
  label: string;
  size: string;
  color: string;
  price: number;
  printfulVariantId: number;
}

const seeded = seededCatalog as SeededPrintfulCatalog;

function getStoreId() {
  const rawStoreId = process.env.PRINTFUL_STORE_ID;
  const parsedStoreId = rawStoreId ? Number(rawStoreId) : seeded.storeId;
  return Number.isFinite(parsedStoreId) ? parsedStoreId : seeded.storeId;
}

function getHeaders() {
  const apiKey = process.env.PRINTFUL_API_KEY;

  if (!apiKey) {
    return null;
  }

  return {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  } satisfies Record<string, string>;
}

async function printfulFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const headers = getHeaders();

  if (!headers) {
    throw new Error("PRINTFUL_API_KEY is not configured");
  }

  const response = await fetch(`${PRINTFUL_API_BASE}${path}`, {
    ...options,
    headers: {
      ...headers,
      ...(options?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Printful API ${response.status} on ${path}: ${body}`);
  }

  const json: unknown = await response.json();
  if (typeof json === "object" && json !== null && "result" in json) {
    return (json as { result: T }).result;
  }

  return json as T;
}

export function getSeededPrintfulCatalog() {
  return seeded;
}

export function getShopProducts(): Product[] {
  return products.map((product) => {
    const seededProduct = seeded.products.find((entry) => entry.slug === product.slug);

    return {
      ...product,
      image: product.image ?? seededProduct?.preview_image_url ?? undefined,
    };
  });
}

export function getShopProductByIdentifier(identifier: string) {
  return getShopProducts().find(
    (product) => product.id === identifier || product.slug === identifier,
  );
}

export async function getPrintfulCatalogProducts(): Promise<PrintfulCatalogProduct[]> {
  try {
    return await printfulFetch<PrintfulCatalogProduct[]>("/products?limit=100");
  } catch {
    return [];
  }
}

export async function getPrintfulCatalogVariants(
  blueprintId: number,
): Promise<PrintfulCatalogVariant[]> {
  try {
    return await printfulFetch<PrintfulCatalogVariant[]>(
      `/products/${blueprintId}/variants`,
    );
  } catch {
    return [];
  }
}

export function getSeededVariantOptions(
  identifier: string,
): CatalogVariantResponse[] {
  const product = getShopProductByIdentifier(identifier);

  if (!product) {
    return [];
  }

  const basePrice = product.price;

  if (!product.variants) {
    return [
      {
        id: product.printfulProductId ?? 0,
        label: "Default",
        size: "One size",
        color: "Default",
        price: basePrice,
        printfulVariantId: product.printfulProductId ?? 0,
      },
    ];
  }

  return product.variants.options.map((option, index) => ({
    id: option.printfulVariantId ?? index,
    label: option.label,
    size: option.value,
    color: "Default",
    price: basePrice,
    printfulVariantId: option.printfulVariantId ?? index,
  }));
}

export async function getVariantOptions(identifier: string) {
  const product = getShopProductByIdentifier(identifier);

  if (!product) {
    return [];
  }

  if (!product.printfulProductId) {
    return getSeededVariantOptions(identifier);
  }

  try {
    const liveVariants = await getPrintfulCatalogVariants(product.printfulProductId);

    if (liveVariants.length === 0) {
      return getSeededVariantOptions(identifier);
    }

    return liveVariants.map((variant) => ({
      id: variant.id,
      label: variant.name,
      size: variant.size,
      color: variant.color,
      price: Number.parseFloat(variant.price),
      printfulVariantId: variant.id,
    }));
  } catch {
    return getSeededVariantOptions(identifier);
  }
}

export function getStoreIdForPrintful() {
  return getStoreId();
}
