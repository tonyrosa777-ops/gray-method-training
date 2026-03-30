import { NextResponse } from "next/server";
import {
  getPrintfulCatalogProducts,
  getSeededPrintfulCatalog,
  getShopProducts,
  getStoreIdForPrintful,
} from "@/lib/printful";

export const dynamic = "force-dynamic";

export async function GET() {
  const liveCatalog = await getPrintfulCatalogProducts();

  return NextResponse.json({
    storeId: getStoreIdForPrintful(),
    source: liveCatalog.length > 0 ? "live" : "seeded",
    products: getShopProducts(),
    printfulCatalog: liveCatalog,
    seeded: getSeededPrintfulCatalog(),
  });
}
