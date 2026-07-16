/** Canonical production URL — always use non-www. www redirects here. */
export const SITE_URL = "https://neuroflexkenya.com";

export function absoluteUrl(path = ""): string {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
