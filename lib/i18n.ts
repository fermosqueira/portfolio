import { en } from "./content/en";
import { es } from "./content/es";
import { LOCALES, type Locale } from "./content/schema";
import type { Content } from "./content/types";

const DICTIONARIES: Record<Locale, Content> = { es, en };

export function getDictionary(locale: Locale): Content {
  return DICTIONARIES[locale];
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function otherLocale(locale: Locale): Locale {
  return locale === "es" ? "en" : "es";
}

export { LOCALES, type Locale };
