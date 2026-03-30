/**
 * GRAY METHOD TRAINING - Shop Products
 *
 * Digital products are fulfilled manually.
 * Merch is structured for physical fulfillment and seeded fallback data.
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
    id: "gm-weekly-reset-planner",
    slug: "gray-method-weekly-reset-planner",
    name: "Gray Method Weekly Reset Planner",
    price: 19,
    description:
      "A simple weekly reset template for planning training, meals, and habits without overthinking.",
    longDescription:
      "A printable and fillable planner that helps you map the week, choose the one habit that matters, and stay aligned without overcomplicating the process.",
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
      "100% cotton soft-style women's fitted tee with a minimalist Gray Method wordmark on the left chest. Built for the current Gray Method merch drop.",
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
    id: "gm-crop-hoodie",
    slug: "gray-method-crop-hoodie",
    name: "Gray Method Crop Hoodie",
    price: 54.5,
    description:
      "Relaxed crop hoodie with a subtle Gray Method mark. Easy to wear, easy to layer.",
    longDescription:
      "Midweight crop hoodie with a soft hand feel and a small Gray Method chest mark. Built to be a simple, wearable staple in the collection.",
    category: "merch",
    fulfillment: "printful",
    url: "/shop",
    printfulProductId: 910003,
    variants: {
      name: "Size",
      options: [
        { label: "Small", value: "S", printfulVariantId: 91000301 },
        { label: "Medium", value: "M", printfulVariantId: 91000302 },
        { label: "Large", value: "L", printfulVariantId: 91000303 },
        { label: "X-Large", value: "XL", printfulVariantId: 91000304 },
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
  {
    id: "gm-journal",
    slug: "gray-method-journal",
    name: "Gray Method Journal",
    price: 24,
    description:
      "A clean notebook for resets, planning, and the work you actually want to remember.",
    longDescription:
      "A hardcover spiral journal with lined pages and a minimal Gray Method cover mark. Useful for weekly resets, reflections, and client planning.",
    category: "merch",
    fulfillment: "printful",
    url: "/shop",
    printfulProductId: 910004,
  },
  {
    id: "gm-tumbler",
    slug: "gray-method-stainless-tumbler",
    name: "Gray Method Stainless Tumbler",
    price: 35,
    description:
      "Insulated tumbler for the long days, early mornings, and everything in between.",
    longDescription:
      "A stainless steel insulated tumbler with a minimal Gray Method mark. Built for hot coffee, cold water, and anywhere the day takes you.",
    category: "merch",
    fulfillment: "printful",
    url: "/shop",
    printfulProductId: 910005,
  },
  {
    id: "gm-water-bottle",
    slug: "gray-method-water-bottle",
    name: "Gray Method Water Bottle",
    price: 29,
    description:
      "Clean aluminum bottle with a subtle logo and a simple everyday shape.",
    longDescription:
      "A lightweight metal water bottle with a Gray Method logo, made to sit comfortably on a desk, in a bag, or beside a training mat.",
    category: "merch",
    fulfillment: "printful",
    url: "/shop",
    printfulProductId: 910006,
  },
  {
    id: "gm-tote-bag",
    slug: "gray-method-tote-bag",
    name: "Gray Method Tote Bag",
    price: 26,
    description:
      "Simple carry-all tote for books, groceries, and the things that leave the house with you.",
    longDescription:
      "A sturdy everyday tote with a minimal Gray Method print. Easy to fold, easy to grab, and designed to stay in the rotation.",
    category: "merch",
    fulfillment: "printful",
    url: "/shop",
    printfulProductId: 910007,
  },
  {
    id: "gm-backpack",
    slug: "gray-method-backpack",
    name: "Gray Method Backpack",
    price: 62,
    description:
      "Everyday backpack with enough room for work, travel, and the gym.",
    longDescription:
      "A structured backpack with a clean Gray Method logo and practical storage for a laptop, notebook, and daily essentials.",
    category: "merch",
    fulfillment: "printful",
    url: "/shop",
    printfulProductId: 910008,
  },
  {
    id: "gm-laptop-sleeve",
    slug: "gray-method-laptop-sleeve",
    name: "Gray Method Laptop Sleeve",
    price: 34,
    description:
      "Minimal laptop sleeve for the desk, the coffee shop, or the bag between sessions.",
    longDescription:
      "A padded laptop sleeve with a clean Gray Method mark. Simple protection for your device without turning it into a billboard.",
    category: "merch",
    fulfillment: "printful",
    url: "/shop",
    printfulProductId: 910009,
  },
];

export const digitalProducts = products.filter((product) => product.category === "digital");
export const merchProducts = products.filter((product) => product.category === "merch");
export const shopCategories = ["all", "digital", "merch"] as const;
