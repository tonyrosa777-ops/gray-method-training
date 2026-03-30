"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/cart";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const formatPrice = (value: number) => currencyFormatter.format(value);

export default function CartDrawer() {
  const {
    items,
    count,
    total,
    isOpen,
    removeItem,
    updateQuantity,
    clearCart,
    closeCart,
  } = useCart();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeCart();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeCart, isOpen]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            type="button"
            aria-label="Close cart"
            className="fixed inset-0 z-40 bg-black/55 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={closeCart}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-title"
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-gray-bg-2 text-gray-text shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_24px_80px_rgba(0,0,0,0.6)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold/80">
                  Cart
                </p>
                <h2
                  id="cart-drawer-title"
                  className="mt-2 font-display text-title-md font-semibold text-gray-text"
                >
                  Your items
                </h2>
                <p className="mt-1 font-body text-sm text-gray-text-2">
                  {count} item{count === 1 ? "" : "s"}
                </p>
              </div>

              <button
                type="button"
                onClick={closeCart}
                className="rounded-full border border-white/10 p-2 text-gray-text-2 transition-colors hover:border-gold/30 hover:text-gold"
                aria-label="Close cart drawer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M6 6l12 12M18 6 6 18"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-gray-elevated/70 px-6 text-center">
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-gold/20 bg-gold/5 text-gold"
                    aria-hidden="true"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M6 6h15l-1.5 8.5a2 2 0 0 1-2 1.5H9a2 2 0 0 1-2-1.5L5 3H2"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="9" cy="20" r="1.5" fill="currentColor" />
                      <circle cx="18" cy="20" r="1.5" fill="currentColor" />
                    </svg>
                  </div>
                  <h3 className="font-display text-title-md font-semibold text-gray-text">
                    Your cart is empty
                  </h3>
                  <p className="mt-2 max-w-xs font-body text-sm leading-relaxed text-gray-text-2">
                    Add an item from the shop and it will appear here with quantity
                    controls and saved cart state.
                  </p>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="mt-6 inline-flex items-center justify-center rounded-lg border border-gold/25 px-4 py-2 font-body text-sm font-medium text-gold transition-colors hover:border-gold/40 hover:bg-gold/10"
                  >
                    Continue shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="rounded-2xl border border-white/8 bg-gray-elevated p-4 shadow-card"
                    >
                      <div className="flex gap-4">
                        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-gray-subtle">
                          {item.imageUrl ? (
                            <Image
                              src={item.imageUrl}
                              alt={item.name}
                              fill
                              unoptimized
                              sizes="64px"
                              className="object-cover"
                            />
                          ) : (
                            <span className="font-mono text-xs text-gray-muted">
                              GM
                            </span>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="truncate font-body text-sm font-medium text-gray-text">
                                {item.name}
                              </p>
                              <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1">
                                {item.category ? (
                                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-gray-text-2">
                                    {item.category}
                                  </span>
                                ) : null}
                                {item.size ? (
                                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-gray-text-2">
                                    Size {item.size}
                                  </span>
                                ) : null}
                                {item.color ? (
                                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-gray-text-2">
                                    {item.color}
                                  </span>
                                ) : null}
                                {item.variant ? (
                                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-gray-text-2">
                                    {item.variant}
                                  </span>
                                ) : null}
                                {typeof item.printfulVariantId === "number" ? (
                                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-gray-text-2">
                                    Printful #{item.printfulVariantId}
                                  </span>
                                ) : null}
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="rounded-full p-1.5 text-gray-muted transition-colors hover:text-orange-accent"
                              aria-label={`Remove ${item.name}`}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path
                                  d="M6 6l12 12M18 6 6 18"
                                  stroke="currentColor"
                                  strokeWidth="1.75"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </button>
                          </div>

                          <div className="mt-4 flex items-center justify-between gap-3">
                            <div className="flex items-center rounded-full border border-white/10 bg-gray-bg px-2 py-1">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="grid h-8 w-8 place-items-center rounded-full text-gray-text-2 transition-colors hover:bg-white/5 hover:text-gray-text"
                                aria-label={`Decrease quantity for ${item.name}`}
                              >
                                <span aria-hidden="true">-</span>
                              </button>
                              <span className="min-w-8 px-2 text-center font-mono text-sm text-gray-text">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="grid h-8 w-8 place-items-center rounded-full text-gray-text-2 transition-colors hover:bg-white/5 hover:text-gray-text"
                                aria-label={`Increase quantity for ${item.name}`}
                              >
                                <span aria-hidden="true">+</span>
                              </button>
                            </div>

                            <p className="font-mono text-sm text-gold">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 ? (
              <div className="border-t border-white/10 px-6 py-5">
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-gray-text-2">Subtotal</span>
                  <span className="font-mono text-lg text-gray-text">
                    {formatPrice(total)}
                  </span>
                </div>

                <div className="mt-5 grid gap-3">
                  <button
                    type="button"
                    onClick={clearCart}
                    className="inline-flex items-center justify-center rounded-lg border border-white/10 px-4 py-3 font-body text-sm font-medium text-gray-text-2 transition-colors hover:border-orange-accent/30 hover:text-orange-accent"
                  >
                    Clear cart
                  </button>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="inline-flex items-center justify-center rounded-lg bg-gold px-4 py-3 font-body text-sm font-medium text-gray-bg transition-colors hover:bg-gold-light"
                  >
                    Close drawer
                  </button>
                </div>
              </div>
            ) : null}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
