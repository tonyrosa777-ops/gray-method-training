"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart";
import { shopCategories, type Product } from "@/data/shop";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";
import StaggerContainer, {
  StaggerItem,
  staggerItemScaleVariants,
} from "@/components/animations/StaggerContainer";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const categoryLabels: Record<Product["category"], string> = {
  digital: "Digital download",
  merch: "Merch",
};

const categoryDescriptions: Record<Product["category"], string> = {
  digital: "Instant access after checkout.",
  merch: "Physical item shipped after checkout.",
};

function ProductArt({ product }: { product: Product }) {
  return (
    <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-gray-bg/70 px-6 py-8">
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            product.category === "digital"
              ? "linear-gradient(135deg, rgba(200,169,110,0.1), rgba(255,255,255,0.02))"
              : "linear-gradient(135deg, rgba(232,98,26,0.08), rgba(200,169,110,0.04))",
        }}
      />
      {product.image ? (
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover opacity-90 mix-blend-screen"
        />
      ) : (
        <div className="relative z-10 flex flex-col items-center gap-4 text-center">
          <div className="flex h-18 w-18 items-center justify-center rounded-full border border-gold/15 bg-gold/5 text-gold">
            {product.category === "digital" ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="8" y1="13" x2="16" y2="13" />
                <line x1="8" y1="17" x2="14" y2="17" />
              </svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                <path d="M7.5 7.5h.01" />
              </svg>
            )}
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gray-muted">
            {categoryLabels[product.category]}
          </p>
          <p className="max-w-[220px] font-body text-sm leading-relaxed text-gray-text-2">
            {categoryDescriptions[product.category]}
          </p>
        </div>
      )}
      {product.badge ? (
        <div className="absolute left-4 top-4 z-10">
          <Badge variant="gold">{product.badge}</Badge>
        </div>
      ) : null}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedOption, setSelectedOption] = useState(
    product.variants?.options[0] ?? null,
  );

  const selectedVariantLabel = useMemo(() => {
    if (!product.variants || !selectedOption) {
      return undefined;
    }

    return `${product.variants.name}: ${selectedOption.label}`;
  }, [product.variants, selectedOption]);

  const handleAdd = () => {
    addItem({
      id: selectedOption?.printfulVariantId ?? product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.image,
      category: product.category,
      size: selectedOption?.value,
      variant: selectedVariantLabel,
      printfulVariantId: selectedOption?.printfulVariantId ?? product.printfulProductId,
    });
  };

  return (
    <motion.article
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-gray-elevated shadow-card transition-all duration-300 hover:border-gold/20 hover:shadow-card-hover"
      variants={staggerItemScaleVariants}
    >
      <ProductArt product={product} />

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="space-y-2">
            <Badge variant={product.category === "digital" ? "gold" : "limited"}>
              {categoryLabels[product.category]}
            </Badge>
            <h3 className="font-display text-title-md font-semibold leading-tight text-gray-text">
              {product.name}
            </h3>
          </div>
          <span className="font-mono text-lg text-gold">
            {currencyFormatter.format(product.price)}
          </span>
        </div>

        <p className="font-body text-sm leading-relaxed text-gray-text-2">
          {product.longDescription}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/8 bg-gray-bg px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-gray-text-2">
            {categoryDescriptions[product.category]}
          </span>
        </div>

        {product.variants ? (
          <div className="mt-5">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-gray-muted">
              {product.variants.name}
            </p>
            <div className="flex flex-wrap gap-2">
              {product.variants.options.map((option) => {
                const isActive = selectedOption?.value === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSelectedOption(option)}
                    className={[
                      "rounded-full border px-3 py-1.5 font-body text-xs transition-colors",
                      isActive
                        ? "border-gold/40 bg-gold/10 text-gold"
                        : "border-white/10 text-gray-text-2 hover:border-gold/20 hover:text-gray-text",
                    ].join(" ")}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/5 pt-5">
          <Button onClick={handleAdd} variant="gold" size="sm">
            Add to cart
          </Button>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-gray-muted">
            Cart saves locally
          </p>
        </div>
      </div>
    </motion.article>
  );
}

type ShopTab = (typeof shopCategories)[number];

interface ShopClientProps {
  products: Product[];
}

export default function ShopClient({ products }: ShopClientProps) {
  const [activeTab, setActiveTab] = useState<ShopTab>("all");

  const displayedProducts = products.filter((product) => {
    if (activeTab === "all") {
      return true;
    }

    return product.category === activeTab;
  });

  return (
    <main className="bg-gray-bg min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn className="mb-10 max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-gold">
            Gray Method Shop
          </p>
          <h1 className="font-display text-display font-semibold leading-[1.05] text-gray-text">
            Guides, tools, and gear that work with the method.
          </h1>
          <p className="mt-4 font-body text-lead leading-relaxed text-gray-text-2">
            Digital resources land instantly. Merch ships after checkout. Your cart stays local until you are ready to check out.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mb-10 flex flex-wrap gap-2">
          {shopCategories.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={[
                "rounded-full border px-4 py-2 font-body text-sm transition-colors",
                activeTab === tab
                  ? "border-gold/30 bg-gold/10 text-gold"
                  : "border-white/10 text-gray-text-2 hover:border-gold/20 hover:text-gray-text",
              ].join(" ")}
            >
              {tab === "all" ? "All products" : tab === "digital" ? "Digital" : "Merch"}
            </button>
          ))}
        </FadeIn>

        <StaggerContainer className="grid gap-6 lg:grid-cols-2" staggerDelay={0.08}>
          {displayedProducts.map((product) => (
            <StaggerItem key={product.id} variants={staggerItemScaleVariants}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.2} className="mt-12 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-gray-muted">
            Secure checkout will route through Stripe once live credentials are set.
          </p>
        </FadeIn>
      </div>
    </main>
  );
}
