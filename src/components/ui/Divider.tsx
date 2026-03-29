interface DividerProps {
  className?: string;
  /** Show the gold diamond glyph in the center */
  withDiamond?: boolean;
}

export default function Divider({ className = "", withDiamond = true }: DividerProps) {
  if (!withDiamond) {
    return <div className={`section-divider ${className}`} aria-hidden="true" />;
  }

  return (
    <div
      className={`relative flex items-center justify-center py-2 ${className}`}
      aria-hidden="true"
    >
      <div className="section-divider absolute inset-x-0 top-1/2 -translate-y-1/2" />
      <span className="relative z-10 px-3 bg-gray-bg text-gold text-xs leading-none">
        ◆
      </span>
    </div>
  );
}
