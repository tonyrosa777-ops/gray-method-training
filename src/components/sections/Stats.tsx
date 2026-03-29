import { stats } from "@/data/site";
import CountUp from "@/components/animations/CountUp";
import FadeUp from "@/components/animations/FadeUp";

export default function Stats() {
  return (
    <section
      className="bg-gray-bg-2 py-20 lg:py-24"
      aria-label="Gray Method Training by the numbers"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {stats.map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.12}>
              <div
                className={[
                  "relative flex flex-col items-center text-center py-10 px-6",
                  // Vertical dividers between items (desktop)
                  i < stats.length - 1
                    ? "lg:border-r border-white/5"
                    : "",
                  // Horizontal dividers for 2-col mobile
                  i < 2 ? "border-b lg:border-b-0 border-white/5" : "",
                ].join(" ")}
              >
                {/* Number */}
                <div className="font-mono text-[3.5rem] leading-none text-orange-accent mb-2">
                  <CountUp
                    end={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.value % 1 !== 0 ? 1 : 0}
                  />
                </div>

                {/* Label */}
                <p className="font-body text-sm text-gray-text-2 leading-snug">
                  {stat.label}
                </p>

                {/* Note */}
                {stat.note && (
                  <p className="font-body text-xs text-gray-muted mt-1 italic">
                    {stat.note}
                  </p>
                )}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
