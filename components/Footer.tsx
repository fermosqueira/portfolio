import { PROFILE, type Locale } from "@/lib/content/schema";
import { getDictionary } from "@/lib/i18n";

const LINKS = [
  { href: PROFILE.linkedin, label: "LinkedIn" },
  { href: PROFILE.github, label: "GitHub" },
] as const;

export function Footer({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);

  return (
    <footer className="border-t border-line py-8">
      <ul className="flex flex-wrap gap-5" data-testid="footer-links">
        {LINKS.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-muted transition-colors hover:text-accent"
            >
              {link.label} ↗
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-muted">
        <p>{t.footer.builtWith}</p>
        <p>{t.footer.rights}</p>
      </div>
    </footer>
  );
}
