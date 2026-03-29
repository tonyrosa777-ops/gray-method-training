"use client";

import { useState } from "react";
import Image from "next/image";
import { products, digitalProducts, merchProducts, type Product } from "@/data/shop";
import Badge from "@/components/ui/Badge";
import FadeIn from "@/components/animations/FadeIn";
import StaggerContainer, { StaggerItem, staggerItemScaleVariants } from "@/components/animations/StaggerContainer";

/* ------------------------------------------------------------------ */
/*  Product Card                                                        */
/* ------------------------------------------------------------------ */
function ProductCard({ product }: { product: Product }) {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.options[0]?.value ?? ""
  );

  return (
    <article className="group flex flex-col rounded-xl overflow-hidden bg-gray-elevated border border-white/5 hover:border-gold/20 transition-all duration-300 shadow-card hover:shadow-card-hover">
      {/* Image */}
      <div className="relative aspect-square bg-gray-subtle overflow-hidden flex-shrink-0">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: "rgba(200,169,110,0.08)", border: "1px solid rgba(200,169,110,0.15)" }}
              aria-hidden="true"
            >
              {product.category === "digital" ? (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(200,169,110,0.6)" strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              ) : (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(200,169,110,0.6)" strokeWidth="1.5">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
              )}
            </div>
            <span className="font-mono text-xs text-gray-muted tracking-widest text-center uppercase">
              {product.category === "digital" ? "Digital Download" : "Gray Method Merch"}
            </span>
          </div>
        )}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <Badge variant="gold">{product.badge}</Badge>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        <h3 className="font-display font-semibold text-title-md text-gray-text leading-snug">
          {product.name}
        </h3>
        <p className="font-body text-sm text-gray-text-2 leading-relaxed flex-1">
          {product.description}
        </p>

        {/* Size selector */}
        {product.variants && (
          <div>
            <p className="font-mono text-xs text-gray-muted tracking-wider uppercase mb-2">
              {product.variants.name}
            </p>
            <div className="flex flex-wrap gap-2">
              {product.variants.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSelectedVariant(opt.value)}
                  className={`px-3 py-1 rounded font-body text-xs border transition-all duration-150 ${
                    selectedVariant === opt.value
                      ? "bg-gold/10 border-gold/40 text-gold"
                      : "border-white/10 text-gray-muted hover:border-white/20 hover:text-gray-text-2"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <span className="font-mono text-xl text-gold">${product.price}</span>
          <button
            className="snipcart-add-item inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gold text-gray-bg font-body text-sm font-medium hover:bg-gold-light transition-colors duration-200 active:scale-[0.98]"
            data-item-id={product.id}
            data-item-name={product.name}
            data-item-price={product.price}
            data-item-url={product.url}
            data-item-description={product.description}
            data-item-custom1-name={product.variants?.name ?? undefined}
            data-item-custom1-options={
              product.variants
                ? product.variants.options.map((o) => o.label).join("|")
                : undefined
            }
            data-item-custom1-value={selectedVariant || undefined}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Main client component                                               */
/* ------------------------------------------------------------------ */
type Tab = "all" | "digital" | "merch";

export default function ShopClient() {
  const [activeTab, setActiveTab] = useState<Tab>("all");

  const displayed =
    activeTab === "all" ? products : activeTab === "digital" ? digitalProducts : merchProducts;

  return (
    <main className="bg-gray-bg min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <FadeIn className="mb-12">
          <p className="font-mono text-xs text-gold tracking-[0.2em] uppercase mb-4">
            Gray Method Shop
          </p>
          <h1 className="font-display font-semibold text-title-xl text-gray-text leading-[1.1] max-w-lg mb-4">
            Guides, tools &amp; gear.
          </h1>
          <p className="font-body text-lead text-gray-text-2 max-w-xl">
            Resources Adam uses with clients, and merch worth wearing.
          </p>
        </FadeIn>

        {/* Tabs */}
        <FadeIn delay={0.1} className="flex gap-1 mb-10">
          {(["all", "digital", "merch"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-body text-sm capitalize transition-all duration-200 ${
                activeTab === tab
                  ? "bg-gold/10 border border-gold/30 text-gold"
                  : "text-gray-muted hover:text-gray-text-2 border border-transparent"
              }`}
            >
              {tab === "all" ? "All Products" : tab === "digital" ? "Digital" : "Merch"}
            </button>
          ))}
        </FadeIn>

        {/* Product grid */}
        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={0.08}
        >
          {displayed.map((product) => (
            <StaggerItem key={product.id} variants={staggerItemScaleVariants}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Trust line */}
        <FadeIn delay={0.3} className="mt-12 text-center">
          <p className="font-mono text-xs text-gray-muted tracking-wide">
            Secure checkout via Snipcart · Digital products delivered via email · Merch shipped by Printful
          </p>
        </FadeIn>
      </div>
    </main>
  );
}
