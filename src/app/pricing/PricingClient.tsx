"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { pricing } from "@/data/site";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Divider from "@/components/ui/Divider";
import FadeIn from "@/components/animations/FadeIn";
import FadeUp from "@/components/animations/FadeUp";
import StaggerContainer, { StaggerItem, staggerItemScaleVariants } from "@/components/animations/StaggerContainer";
import CountUp from "@/components/animations/CountUp";

type PackageId = "starter" | "pro" | "premium";

const packageOrder: PackageId[] = ["starter", "pro", "premium"];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCompactCurrency(value: number) {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}k`;
  }
  return formatCurrency(value);
}

function ResultCard({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className={[
        "rounded-2xl border p-5 lg:p-6",
        accent ? "border-gold/30 bg-gold/10" : "border-white/5 bg-gray-elevated",
      ].join(" ")}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gray-muted">
        {label}
      </p>
      <p className={[
        "mt-2 font-display text-title-md font-semibold leading-none",
        accent ? "text-gold" : "text-gray-text",
      ].join(" ")}>
        {value}
      </p>
    </div>
  );
}

function PricingCard({ tier, selected, onSelect }: {
  tier: (typeof pricing.tiers)[number];
  selected: boolean;
  onSelect: (id: PackageId) => void;
}) {
  return (
    <div
      className={[
        "relative flex h-full flex-col rounded-2xl border p-8 transition-all duration-300",
        tier.featured
          ? "border-gold/40 bg-gold-dim shadow-[0_0_0_1px_rgba(200,169,110,0.18),0_12px_45px_rgba(0,0,0,0.45)]"
          : "border-white/5 bg-gray-elevated shadow-card hover:border-gold/20 hover:shadow-card-hover",
        selected ? "ring-1 ring-gold/30" : "",
      ].join(" ")}
    >
      {tier.featured && (
        <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-transparent via-gold to-transparent" aria-hidden="true" />
      )}

      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gray-muted">
            {tier.tag}
          </p>
          <h3 className={[
            "mt-2 font-display text-title-md font-semibold",
            tier.featured ? "text-gold-light" : "text-gray-text",
          ].join(" ")}>
            {tier.name}
          </h3>
        </div>
        {tier.featured && <Badge variant="gold">Recommended</Badge>}
      </div>

      <div className="mb-4">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-gray-muted">
          One-time investment
        </p>
        <p className={[
          "mt-1 font-display text-display font-semibold leading-none",
          tier.featured ? "text-orange-accent" : "text-gray-text",
        ].join(" ")}>
          {formatCurrency(tier.price)}
        </p>
      </div>

      <p className="mb-6 max-w-sm font-body text-sm leading-relaxed text-gray-text-2">
        {tier.description}
      </p>

      <ul className="mb-8 space-y-3 flex-1">
        {tier.features.map((feature) => (
          <li key={feature} className="flex gap-3 font-body text-sm leading-relaxed text-gray-text-2">
            <span className={[
              "mt-1 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-[10px]",
              tier.featured ? "bg-gold/20 text-gold" : "bg-white/5 text-gray-text-2",
            ].join(" ")} aria-hidden="true">
              ✓
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="space-y-3">
        <Button
          onClick={() => onSelect(tier.id as PackageId)}
          variant={tier.featured ? "gold" : "ghost"}
          size="lg"
          className="w-full justify-center"
        >
          {selected ? "Selected" : tier.cta}
        </Button>
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.18em] text-gray-muted">
          {tier.featured ? "Most popular choice" : "Best for the right-fit project"}
        </p>
      </div>
    </div>
  );
}

function PricingCalculator() {
  const [selectedPackage, setSelectedPackage] = useState<PackageId>("pro");
  const [monthlyLeads, setMonthlyLeads] = useState(pricing.roi.defaults.monthlyLeads);
  const [closeRate, setCloseRate] = useState(pricing.roi.defaults.closeRate);
  const [averageClientValue, setAverageClientValue] = useState(pricing.roi.defaults.averageClientValue);

  const selectedTier = pricing.tiers.find((tier) => tier.id === selectedPackage) ?? pricing.tiers[1];
  const monthlyClosedClients = monthlyLeads * (closeRate / 100);
  const monthlyRevenue = monthlyClosedClients * averageClientValue;
  const annualRevenue = monthlyRevenue * 12;
  const breakEvenMonths = monthlyRevenue > 0 ? selectedTier.price / monthlyRevenue : 0;
  const breakEvenClients = averageClientValue > 0 ? selectedTier.price / averageClientValue : 0;

  return (
    <section id="roi" className="bg-gray-bg py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <FadeUp className="mb-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
              {pricing.roi.eyebrow}
            </p>
          </FadeUp>
          <FadeUp delay={0.05} className="mb-4">
            <h2 className="font-display text-title-xl font-semibold leading-tight text-gray-text">
              {pricing.roi.headline}
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="font-body text-lead leading-relaxed text-gray-text-2">
              {pricing.roi.sub}
            </p>
          </FadeUp>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-white/5 bg-gray-elevated p-6 lg:p-8">
            <div className="mb-6 flex flex-wrap gap-3">
              {pricing.tiers.map((tier) => {
                const active = selectedPackage === tier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setSelectedPackage(tier.id as PackageId)}
                    className={[
                      "rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] transition-all duration-200",
                      active
                        ? tier.featured
                          ? "border-gold bg-gold text-gray-bg"
                          : "border-gold bg-white/5 text-gold"
                        : "border-white/10 bg-gray-bg/40 text-gray-text-2 hover:border-gold/30 hover:text-gray-text",
                    ].join(" ")}
                  >
                    {tier.name} {formatCurrency(tier.price)}
                  </button>
                );
              })}
            </div>

            <div className="space-y-6">
              <label className="block">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <span className="font-body text-sm text-gray-text-2">Monthly qualified leads from the site</span>
                  <span className="font-display text-title-md font-semibold text-gray-text">
                    <CountUp end={monthlyLeads} />
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={20}
                  step={1}
                  value={monthlyLeads}
                  onChange={(event) => setMonthlyLeads(Number(event.target.value))}
                  className="w-full accent-gold"
                />
                <div className="mt-2 flex justify-between font-mono text-xs text-gray-muted">
                  <span>1 lead</span>
                  <span>20 leads</span>
                </div>
              </label>

              <label className="block">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <span className="font-body text-sm text-gray-text-2">Call-to-client close rate</span>
                  <span className="font-display text-title-md font-semibold text-gray-text">
                    <CountUp end={closeRate} suffix="%" />
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={50}
                  step={1}
                  value={closeRate}
                  onChange={(event) => setCloseRate(Number(event.target.value))}
                  className="w-full accent-gold"
                />
                <div className="mt-2 flex justify-between font-mono text-xs text-gray-muted">
                  <span>5%</span>
                  <span>50%</span>
                </div>
              </label>

              <label className="block">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <span className="font-body text-sm text-gray-text-2">Average client value</span>
                  <span className="font-display text-title-md font-semibold text-gray-text">
                    {formatCurrency(averageClientValue)}
                  </span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={10000}
                  step={250}
                  value={averageClientValue}
                  onChange={(event) => setAverageClientValue(Number(event.target.value))}
                  className="w-full accent-gold"
                />
                <div className="mt-2 flex justify-between font-mono text-xs text-gray-muted">
                  <span>$500</span>
                  <span>$10k</span>
                </div>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <ResultCard label="Selected package" value={`${selectedTier.name} - ${formatCurrency(selectedTier.price)}`} />
            <ResultCard label="Monthly revenue" value={formatCompactCurrency(monthlyRevenue)} accent />
            <ResultCard label="Annual revenue" value={formatCompactCurrency(annualRevenue)} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
              <ResultCard label="Break even" value={breakEvenMonths > 0 ? `${breakEvenMonths.toFixed(1)} mo` : "-"} />
              <ResultCard label="Clients to recoup" value={breakEvenClients > 0 ? `${Math.ceil(breakEvenClients)}` : "-"} accent />
            </div>
            <div className="rounded-2xl border border-white/5 bg-gray-bg/60 p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
                Why this matters
              </p>
              <p className="mt-3 font-body text-sm leading-relaxed text-gray-text-2">
                If the site helps you book a few more qualified calls each month, the payback window is short. The calculator is intentionally conservative so you can test the numbers against your own close rate instead of guessing.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-6 max-w-4xl font-mono text-xs leading-relaxed text-gray-muted">
          {pricing.roi.note}
        </p>
      </div>
    </section>
  );
}

function ComparisonTable() {
  return (
    <section className="bg-gray-bg py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <FadeUp className="mb-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
              {pricing.comparison.eyebrow}
            </p>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h2 className="font-display text-title-xl font-semibold leading-tight text-gray-text">
              {pricing.comparison.headline}
            </h2>
          </FadeUp>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/5 bg-gray-elevated">
          <div className="grid grid-cols-[1.5fr_repeat(3,1fr)] border-b border-white/5 bg-gray-bg/40 px-4 py-4 text-center font-mono text-xs uppercase tracking-[0.18em] text-gray-muted lg:px-6">
            <div className="text-left">Feature</div>
            {pricing.tiers.map((tier) => (
              <div key={tier.id} className={tier.featured ? "text-gold" : ""}>
                {tier.name} {formatCurrency(tier.price)}
              </div>
            ))}
          </div>

          <div className="divide-y divide-white/5">
            {pricing.comparison.rows.map((row) => (
              <div key={row.feature} className="grid grid-cols-[1.5fr_repeat(3,1fr)] items-center px-4 py-4 lg:px-6">
                <div className="pr-4 font-body text-sm text-gray-text-2">
                  {row.feature}
                </div>
                {[row.starter, row.pro, row.premium].map((hasFeature, index) => {
                  const tier = packageOrder[index];
                  return (
                    <div key={tier} className="flex justify-center">
                      <span
                        className={[
                          "inline-flex h-8 w-8 items-center justify-center rounded-full border text-sm",
                          hasFeature
                            ? tier === "pro"
                              ? "border-gold/30 bg-gold/10 text-gold"
                              : "border-white/10 bg-white/5 text-gray-text"
                            : "border-white/5 bg-transparent text-gray-muted/40",
                        ].join(" ")}
                        aria-hidden="true"
                      >
                        {hasFeature ? "✓" : "-"}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/5 bg-gray-elevated px-6 py-5 text-center lg:flex-row lg:text-left">
          <div>
            <p className="font-display text-title-md font-semibold text-gray-text">
              One of these should feel like the obvious fit.
            </p>
            <p className="mt-1 font-body text-sm text-gray-text-2">
              If you are not sure, choose the tier that matches how much help you want after launch.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" variant="gold" size="lg">
              Schedule a Free Call
            </Button>
            <Button href="#roi" variant="ghost" size="lg">
              Run the numbers again
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PricingClient() {
  const [selectedPackage, setSelectedPackage] = useState<PackageId>("pro");

  const activeTier = useMemo(
    () => pricing.tiers.find((tier) => tier.id === selectedPackage) ?? pricing.tiers[1],
    [selectedPackage]
  );

  return (
    <main className="bg-gray-bg min-h-screen">
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-36 lg:pb-24">
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <div
            className="h-[620px] w-[620px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(200,169,110,0.08) 0%, rgba(232,98,26,0.04) 45%, transparent 72%)",
              filter: "blur(70px)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <FadeIn>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
              Website build proposal
            </p>
          </FadeIn>
          <FadeUp delay={0.05} className="mt-5">
            <h1 className="mx-auto max-w-4xl font-display text-display font-semibold leading-[0.95] text-gray-text text-balance">
              {pricing.headline}
            </h1>
          </FadeUp>
          <FadeUp delay={0.1} className="mx-auto mt-6 max-w-3xl">
            <p className="font-body text-lead leading-relaxed text-gray-text-2">
              {pricing.sub}
            </p>
          </FadeUp>

          <FadeUp delay={0.15} className="mt-8 flex flex-wrap justify-center gap-3">
            {pricing.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-gray-text-2"
              >
                {chip}
              </span>
            ))}
          </FadeUp>

          <FadeUp delay={0.2} className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href="#packages" variant="gold" size="lg">
              Review the packages
            </Button>
            <Button href="#roi" variant="ghost" size="lg">
              See the ROI
            </Button>
          </FadeUp>
        </div>
      </section>

      <Divider />

      <section id="packages" className="bg-gray-bg py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeUp className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-gold">
              Three tiers
            </p>
            <h2 className="font-display text-title-xl font-semibold leading-tight text-gray-text">
              Choose the level of support that matches the stage you are in.
            </h2>
          </FadeUp>

          <StaggerContainer className="grid gap-6 lg:grid-cols-3">
            {pricing.tiers.map((tier) => (
              <StaggerItem key={tier.id} variants={staggerItemScaleVariants} className="h-full">
                <PricingCard
                  tier={tier}
                  selected={selectedPackage === tier.id}
                  onSelect={setSelectedPackage}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeUp className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/5 bg-gray-elevated px-6 py-5 text-center lg:flex-row lg:text-left">
            <div>
              <p className="font-display text-title-md font-semibold text-gray-text">
                Recommended: {activeTier.name}
              </p>
              <p className="mt-1 font-body text-sm text-gray-text-2">
                {activeTier.featured
                  ? "This is the strongest fit for the current Gray Method build: enough depth to convert, without paying for features you do not need yet."
                  : "The selected tier gives you a quick reference point while you compare the rest of the page."}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" variant="gold" size="lg">
                Schedule a Free Call
              </Button>
              <Button href="#roi" variant="ghost" size="lg">
                Check the ROI
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>

      <Divider />

      <PricingCalculator />

      <Divider />

      <ComparisonTable />

      <Divider />

      <section className="bg-gray-bg py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <FadeIn>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-gold">
              Next step
            </p>
          </FadeIn>
          <FadeUp delay={0.05}>
            <h2 className="font-display text-title-xl font-semibold leading-tight text-gray-text">
              If this feels like the right fit, we should talk.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1} className="mt-5">
            <p className="font-body text-lead leading-relaxed text-gray-text-2">
              The goal of this page is simple: make the investment clear, make the payoff believable, and give you a direct path to start the conversation.
            </p>
          </FadeUp>
          <FadeUp delay={0.15} className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href="/contact" variant="gold" size="lg">
              Schedule a Free Call
            </Button>
            <Link
              href="/quiz"
              className="font-body text-sm text-gray-text-2 transition-colors duration-200 hover:text-gold"
            >
              Or take the quiz first -&gt;
            </Link>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
