/**
 * GRAY METHOD TRAINING - Shop Products
 *
 * Digital products are fulfilled manually.
 * Merch is structured for Printful-backed fulfillment and seeded fallback data.
 */

export type ProductCategory = "digital" | "merch";
export type ProductFulfillment = "download" | "printful";

export interface ProductVariantOption {
  label: string;
  value: string;
  printfulVariantId?: number;
}

export interface ProductVariant {
  name: string;
  options: ProductVariantOption[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  description: string;
  longDescription: string;
  category: ProductCategory;
  fulfillment: ProductFulfillment;
  badge?: string;
  url: string;
  image?: string;
  printfulProductId?: number;
  variants?: ProductVariant;
}

export const products: Product[] = [
  {
    id: "gm-starter-pack",
    slug: "the-gray-method-starter-pack",
    name: "The Gray Method Starter Pack",
    price: 27,
    description:
      "The exact framework Coach Adam uses with every new client, packaged as a self-guided PDF.",
    longDescription:
      "A starter PDF covering Adam's foundational principles: how to build a training plan around your real schedule, how to approach nutrition without restriction, and the mindset shifts that actually stick. Includes a 4-week workout template.",
    category: "digital",
    fulfillment: "download",
    badge: "DIGITAL DOWNLOAD",
    url: "/shop",
  },
  {
    id: "gm-nutrition-guide",
    slug: "the-hormone-aware-nutrition-guide",
    name: "The Hormone-Aware Nutrition Guide",
    price: 37,
    description:
      "Practical nutrition for women navigating perimenopause and beyond.",
    longDescription:
      "A guide covering how hormonal changes affect metabolism, the protein targets that actually matter, how to stop the restrict-binge cycle, and a sample plan. Written with input from Laura Brown, NP.",
    category: "digital",
    fulfillment: "download",
    badge: "DIGITAL DOWNLOAD",
    url: "/shop",
  },
  {
    id: "gm-tee-fitted",
    slug: "gray-method-fitted-tee",
    name: "Gray Method Fitted Tee",
    price: 32,
    description:
      "Soft fitted tee with a clean Gray Method chest mark. Built for everyday wear.",
    longDescription:
      "100% cotton soft-style women's fitted tee with a minimalist Gray Method wordmark on the left chest. Built for the first Printful-backed merch drop.",
    category: "merch",
    fulfillment: "printful",
    url: "/shop",
    printfulProductId: 910001,
    variants: {
      name: "Size",
      options: [
        { label: "Small", value: "S", printfulVariantId: 91000101 },
        { label: "Medium", value: "M", printfulVariantId: 91000102 },
        { label: "Large", value: "L", printfulVariantId: 91000103 },
        { label: "X-Large", value: "XL", printfulVariantId: 91000104 },
        { label: "2X-Large", value: "2XL", printfulVariantId: 91000105 },
      ],
    },
  },
  {
    id: "gm-dad-hat",
    slug: "gray-method-dad-hat",
    name: "Gray Method Dad Hat",
    price: 28,
    description:
      "Unstructured dad hat with a subtle GM logo. One size fits most.",
    longDescription:
      "Unstructured 6-panel cap with adjustable closure and a small Gray Method logo. Simple, durable, and easy to keep in the lineup.",
    category: "merch",
    fulfillment: "printful",
    url: "/shop",
    printfulProductId: 910002,
  },
];

export const digitalProducts = products.filter((product) => product.category === "digital");
export const merchProducts = products.filter((product) => product.category === "merch");
export const shopCategories = ["all", "digital", "merch"] as const;
