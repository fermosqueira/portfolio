import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import {
  About,
  AiWorkflow,
  Certifications,
  Contact,
  Education,
  Experience,
  Projects,
  Skills,
} from "@/components/Sections";
import { getDictionary, isLocale } from "@/lib/i18n";

/** Section order drives the `01 /`, `02 /` counters in the headings. */
const SECTIONS = [
  About,
  Skills,
  Experience,
  Education,
  Certifications,
  AiWorkflow,
  Projects,
  Contact,
];

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      {/* Without JS the reveal animation never runs, so keep everything visible. */}
      <noscript>
        <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
      </noscript>

      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-racing"
      >
        {t.common.skipToContent}
      </a>

      <Nav lang={lang} />

      <main className="mx-auto max-w-3xl px-6">
        <Hero lang={lang} />
        {SECTIONS.map((SectionComponent, i) => (
          // Static list, never reordered — the index is a stable key.
          <SectionComponent key={i} lang={lang} index={i + 1} />
        ))}
        <Footer lang={lang} />
      </main>
    </>
  );
}
