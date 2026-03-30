import type { Metadata } from "next";
import { Navbar, Footer } from "@/components/layout";
import ShopClient from "./ShopClient";
import { getShopProducts } from "@/lib/printful";

export const metadata: Metadata = {
  title: "Shop | Gray Method Training",
  description:
    "Digital guides, workout resources, and Gray Method branded gear. Built for busy women who want results without the overwhelm.",
  openGraph: {
    title: "Shop | Gray Method Training",
    description: "Digital guides and merch from Coach Adam Gray.",
    type: "website",
  },
};

export default function ShopPage() {
  const products = getShopProducts();

  return (
    <>
      <Navbar />
      <main>
        <ShopClient products={products} />
      </main>
      <Footer />
    </>
  );
}
