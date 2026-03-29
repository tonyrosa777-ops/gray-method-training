"use client";

import Image from "next/image";
import { useState } from "react";
import { photos, type PhotoSlot } from "@/lib/photos";

interface PhotoPlaceholderProps {
  /** Key from the photos manifest */
  photoKey: keyof typeof photos;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Renders next/image for a named photo slot.
 * On image load error (file not yet added), falls back to a styled
 * placeholder showing the slot name + description for the demo.
 *
 * Drop the photo at public/images/[filename] and the placeholder auto-resolves
 * on next page load — zero code changes needed.
 */
export default function PhotoPlaceholder({
  photoKey,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: PhotoPlaceholderProps) {
  const slot: PhotoSlot = photos[photoKey];
  const [hasError, setHasError] = useState(false);

  const [w, h] = slot.aspectRatio.split("/").map(Number);
  const paddingPercent = ((h / w) * 100).toFixed(2);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ paddingBottom: `${paddingPercent}%` }}
    >
      {!hasError ? (
        <Image
          src={slot.src}
          alt={slot.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          onError={() => setHasError(true)}
        />
      ) : null}

      {/* Placeholder — always rendered, sits behind image, visible when image absent/errors */}
      <div
        className={[
          "absolute inset-0 flex flex-col items-center justify-center bg-gray-elevated border border-dashed border-gold/30 gap-2 p-4",
          hasError ? "z-10" : "z-0",
        ].join(" ")}
        aria-hidden={!hasError}
      >
        <div className="text-gold/40 text-3xl mb-1" aria-hidden="true">◆</div>
        <p className="font-mono text-gold/70 text-xs tracking-wider text-center">
          {slot.id}
        </p>
        <p className="font-body text-gray-text-2 text-xs text-center max-w-[180px] leading-relaxed">
          {slot.description}
        </p>
        <p className="font-mono text-gray-muted text-xs mt-1">
          {slot.aspectRatio}
        </p>
        <p className="font-body text-gray-muted text-[10px] mt-1 opacity-50 text-center">
          Drop: /public{slot.src}
        </p>
      </div>
    </div>
  );
}
