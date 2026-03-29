import Image from "next/image";
import { photos, type PhotoSlot } from "@/lib/photos";
import { existsSync } from "fs";
import path from "path";

interface PhotoPlaceholderProps {
  /** Key from the photos manifest */
  photoKey: keyof typeof photos;
  className?: string;
  /** Passed to next/image — overrides sizes from slot aspect ratio */
  sizes?: string;
  priority?: boolean;
}

/**
 * Checks if the real photo file exists in /public/images/.
 * If yes: renders next/image with the real photo.
 * If no: renders a styled placeholder showing the slot name + description.
 *
 * This is a SERVER COMPONENT — the file check runs at build/render time.
 */
export default function PhotoPlaceholder({
  photoKey,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: PhotoPlaceholderProps) {
  const slot: PhotoSlot = photos[photoKey];
  const [w, h] = slot.aspectRatio.split("/").map(Number);
  const paddingPercent = ((h / w) * 100).toFixed(2);

  // Check if the real file exists at build time
  let fileExists = false;
  try {
    const publicPath = path.join(process.cwd(), "public", slot.src);
    fileExists = existsSync(publicPath);
  } catch {
    fileExists = false;
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ paddingBottom: `${paddingPercent}%` }}
    >
      {fileExists ? (
        <Image
          src={slot.src}
          alt={slot.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        // Placeholder — visible during demo, automatically replaced when photo is added
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-elevated border border-dashed border-gold/30 gap-2 p-4">
          <div className="text-gold/50 text-4xl mb-1">◆</div>
          <p className="font-mono text-gold text-xs tracking-wider text-center">
            {slot.id}
          </p>
          <p className="font-body text-gray-text-2 text-xs text-center max-w-[200px] leading-relaxed">
            {slot.description}
          </p>
          <p className="font-mono text-gray-muted text-xs mt-2">
            {slot.aspectRatio} · {slot.usedIn}
          </p>
          <p className="font-body text-gray-muted text-xs mt-1 opacity-60">
            Drop: public{slot.src}
          </p>
        </div>
      )}
    </div>
  );
}
