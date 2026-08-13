"use client";

import { useSyncExternalStore } from "react";
import { PROFILE } from "@/lib/content/schema";

const ADDRESS = `${PROFILE.emailUser}@${PROFILE.emailDomain}`;

/** The value never changes, so nothing ever needs to notify a subscriber. */
const subscribe = () => () => {};

/**
 * The address is stored split in schema.ts and only joined in the browser, so
 * it never appears as a contiguous string in the served HTML. Scrapers reading
 * the static markup get nothing; humans and screen readers get a real mailto.
 *
 * `useSyncExternalStore` is what makes that safe: the server snapshot is null
 * and the client snapshot is the address, so React expects the difference
 * instead of flagging a hydration mismatch.
 */
export function Email({ className }: { className?: string }) {
  const address = useSyncExternalStore(
    subscribe,
    () => ADDRESS,
    () => null,
  );

  if (!address) {
    return (
      <span className={className} aria-hidden>
        {PROFILE.emailUser} [at] {PROFILE.emailDomain}
      </span>
    );
  }

  return (
    <a href={`mailto:${address}`} className={className} data-testid="email-link">
      {address}
    </a>
  );
}
