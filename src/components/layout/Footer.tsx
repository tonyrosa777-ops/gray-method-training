import Link from "next/link";
import { footer, social } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-gray-bg border-t border-gold/20">
      {/* Top rule — gold gradient */}
      <div className="section-divider" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <p className="font-display text-2xl font-semibold text-gold mb-3 tracking-tight">
              Gray Method
            </p>
            <p className="font-body text-sm text-gray-text-2 leading-relaxed max-w-[220px]">
              {footer.tagline}
            </p>
            {/* Social */}
            <div className="flex gap-4 mt-6">
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-text-2 hover:text-gold transition-colors duration-200"
                aria-label="Follow @adamgray_coach on Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-text-2 hover:text-gold transition-colors duration-200"
                aria-label="Gray Method Training on Facebook"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {footer.columns.map((col) => (
            <div key={col.heading}>
              <h3 className="font-mono text-xs text-gold tracking-widest uppercase mb-5">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-3" role="list">
                {col.links.map((link) => (
                  <li key={link.href}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-sm text-gray-text-2 hover:text-gray-text transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="font-body text-sm text-gray-text-2 hover:text-gray-text transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/5 pt-10 mb-12">
          <div className="max-w-md">
            <h3 className="font-display text-xl font-semibold text-gray-text mb-1">
              {footer.newsletterHeading}
            </h3>
            <p className="font-body text-sm text-gray-text-2 mb-4">
              {footer.newsletterSub}
            </p>
            {/* ConvertKit embed slot */}
            <div
              id="newsletter-embed"
              className="w-full min-h-[60px] rounded-lg bg-gray-elevated border border-white/10 flex items-center justify-center"
              aria-label="Newsletter signup form — ConvertKit embed goes here"
            >
              <p className="font-mono text-xs text-gray-muted">
                ConvertKit embed · SETUP.md
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-body text-xs text-gray-muted">
            {footer.copyright}
          </p>
          <div className="flex items-center gap-2 font-body text-xs text-gray-muted">
            <span>{footer.contact.location}</span>
            <span aria-hidden="true">·</span>
            <a
              href={`mailto:${footer.contact.email}`}
              className="hover:text-gray-text-2 transition-colors"
            >
              {footer.contact.email}
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={`tel:${footer.contact.phone.replace(/-/g, "")}`}
              className="hover:text-gray-text-2 transition-colors"
            >
              {footer.contact.phone}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---- Inline icons ---- */
function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
