import Link from "next/link";
import { DEFAULT_LOCALE } from "@/lib/content/schema";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-start justify-center gap-6 px-6">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">404</p>
      <h1 className="text-3xl font-semibold tracking-tight">
        Esta página no existe · This page does not exist
      </h1>
      <Link
        href={`/${DEFAULT_LOCALE}`}
        className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-racing transition-opacity hover:opacity-90"
      >
        Volver al inicio · Back home
      </Link>
    </main>
  );
}
