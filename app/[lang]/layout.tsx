import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { getDictionary, isLocale } from "@/lib/i18n";
import { LOCALES, PROFILE, type Locale } from "@/lib/content/schema";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);

  return {
    metadataBase: new URL(PROFILE.site),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      type: "profile",
      locale: lang === "es" ? "es_AR" : "en_US",
      url: `${PROFILE.site}/${lang}`,
      title: t.meta.title,
      description: t.meta.description,
      siteName: PROFILE.name,
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
    },
    robots: { index: true, follow: true },
  };
}

/**
 * schema.org/Person so search engines read this as a professional profile
 * rather than a generic page. Deliberately omits the email — see Contact.tsx.
 */
function personJsonLd(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PROFILE.name,
    jobTitle: getDictionary(lang).hero.role,
    url: `${PROFILE.site}/${lang}`,
    sameAs: [PROFILE.linkedin, PROFILE.github],
    knowsLanguage: ["es", "en"],
    knowsAbout: [
      "Software Quality Assurance",
      "Test Automation",
      "API Testing",
      "Playwright",
      "TypeScript",
    ],
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={lang} className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full">
        <script
          type="application/ld+json"
          // Static, locally-built object — no user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(lang)) }}
        />
        {children}
      </body>
    </html>
  );
}
