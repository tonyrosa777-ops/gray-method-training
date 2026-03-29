/**
 * GRAY METHOD TRAINING — Shop Products
 *
 * Digital products: Adam emails a download link after purchase.
 * Merch: Fulfilled by Printful (see SETUP.md for Printful+Snipcart webhook).
 *
 * To update prices/names: edit this file.
 * All data-item-* values come from here — update once, reflects everywhere.
 */

export type ProductCategory = "digital" | "merch";

export interface ProductVariant {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  longDescription: string;
  category: ProductCategory;
  badge?: string;
  /** Points to the shop page — Snipcart fetches this to validate the price */
  url: string;
  /** Path to /public/images/ or empty for placeholder */
  image?: string;
  variants?: {
    name: string;
    options: ProductVariant[];
  };
}

export const products: Product[] = [
  /* ---- Digital -------------------------------------------- */
  {
    id: "gm-starter-pack",
    name: "The Gray Method Starter Pack",
    price: 27,
    description: "The exact framework Coach Adam uses with every new client — in a self-guided PDF.",
    longDescription:
      "A 30-page PDF covering Adam's foundational principles: how to build a training plan around your real schedule, how to approach nutrition without restriction, and the mindset shifts that actually stick. Includes a 4-week workout template.",
    category: "digital",
    badge: "DIGITAL DOWNLOAD",
    url: "/shop",
  },
  {
    id: "gm-nutrition-guide",
    name: "The Hormone-Aware Nutrition Guide",
    price: 37,
    description: "Practical nutrition for women navigating perimenopause and beyond.",
    longDescription:
      "A 45-page guide covering how hormonal changes affect metabolism, the protein targets that actually matter, how to stop the restrict–binge cycle, and a 7-day sample plan. Written with input from Laura Brown, NP.",
    category: "digital",
    badge: "DIGITAL DOWNLOAD",
    url: "/shop",
  },
  /* ---- Merch ---------------------------------------------- */
  {
    id: "gm-tee-fitted",
    name: "Gray Method Fitted Tee",
    price: 32,
    description: "Soft, fitted women's tee. Embroidered Gray Method logo. Printed by Printful.",
    longDescription:
      "100% cotton soft-style women's fitted tee. Embroidered \"Gray Method\" wordmark on the left chest. Ships within 3–5 business days via Printful.",
    category: "merch",
    url: "/shop",
    variants: {
      name: "Size",
      options: [
        { label: "Small", value: "S" },
        { label: "Medium", value: "M" },
        { label: "Large", value: "L" },
        { label: "X-Large", value: "XL" },
        { label: "2X-Large", value: "2XL" },
      ],
    },
  },
  {
    id: "gm-dad-hat",
    name: "Gray Method Dad Hat",
    price: 28,
    description: "Unstructured dad hat. Embroidered \"GM\" logo. One size fits most.",
    longDescription:
      "Unstructured 6-panel cap with adjustable closure. Embroidered \"GM\" logo on the front. Available in black. Ships within 3–5 business days via Printful.",
    category: "merch",
    url: "/shop",
  },
];

export const digitalProducts = products.filter((p) => p.category === "digital");
export const merchProducts = products.filter((p) => p.category === "merch");
