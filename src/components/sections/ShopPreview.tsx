import { products } from "@/data/shop";
import { shopPreview } from "@/data/site";
import FadeUp from "@/components/animations/FadeUp";
import StaggerContainer, {
  StaggerItem,
  staggerItemScaleVariants,
} from "@/components/animations/StaggerContainer";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const featuredProducts = products.slice(0, 4);

function categoryCopy(category: "digital" | "merch") {
  return category === "digital" ? "Digital download" : "Merch";
}

function deliveryCopy(category: "digital" | "merch") {
  return category === "digital" ? "Instant access by email" : "Ships after checkout";
}

function categoryIcon(category: "digital" | "merch") {
  if (category === "digital") {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="8" y1="17" x2="14" y2="17" />
      </svg>
    );
  }

  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <path d="M7.5 7.5h.01" />
    </svg>
  );
}

export default function ShopPreview() {
  return (
    <section
      className="relative overflow-hidden bg-gray-bg-2 py-20 lg:py-24"
      aria-label="Gray Method shop preview"
    >
      <div className="absolute inset-x-0 top-0 section-divider" aria-hidden="true" />

      <div
        className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(200,169,110,0.08) 0%, rgba(232,98,26,0.03) 40%, transparent 70%)",
          filter: "blur(70px)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <FadeUp className="mx-auto max-w-3xl text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-gold">
            {shopPreview.eyebrow}
          </p>
          <h2 className="font-display text-title-xl font-semibold leading-[1.05] text-gray-text">
            {shopPreview.headline}
          </h2>
          <p className="mt-4 font-body text-lead leading-relaxed text-gray-text-2">
            {shopPreview.sub}
          </p>
        </FadeUp>

        <StaggerContainer className="mx-auto mt-10 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <StaggerItem
              key={product.id}
              variants={staggerItemScaleVariants}
              className="h-full"
            >
              <article className="group flex h-full flex-col rounded-2xl border border-white/5 bg-gray-elevated p-5 shadow-card transition-all duration-300 hover:border-gold/25 hover:shadow-card-hover">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <Badge variant={product.category === "digital" ? "gold" : "limited"}>
                    {categoryCopy(product.category)}
                  </Badge>
                  <span className="font-mono text-sm text-gold">
                    {currencyFormatter.format(product.price)}
                  </span>
                </div>

                <div className="mb-5 flex min-h-28 items-center justify-center rounded-2xl border border-white/5 bg-gray-bg/70 px-6 py-8 text-gold/80">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/15 bg-gold/5">
                    {categoryIcon(product.category)}
                  </div>
                </div>

                <h3 className="font-display text-title-md font-semibold leading-tight text-gray-text">
                  {product.name}
                </h3>
                <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-gray-text-2">
                  {product.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/8 bg-gray-bg px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-gray-text-2">
                    {deliveryCopy(product.category)}
                  </span>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp className="mt-8 text-center">
          <Button href={shopPreview.cta.href} variant="gold" size="md">
            {shopPreview.cta.label}
          </Button>
        </FadeUp>
      </div>
    </section>
  );
}
