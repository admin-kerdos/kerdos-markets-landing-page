import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(_: NextRequest) {
  const response = NextResponse.next();
  const vercelLiveDomains = ["https://vercel.live", "https://*.vercel.app"];
  const scriptSources = ["'self'", "'unsafe-inline'", "'unsafe-eval'", ...vercelLiveDomains];
  const styleSources = ["'self'", "'unsafe-inline'"];
  const policies = {
    "Content-Security-Policy": [
      "default-src 'self'",
      `script-src ${scriptSources.join(" ")}`,
      `style-src ${styleSources.join(" ")}`,
      "img-src 'self' data: blob:",
      "media-src 'self' data: blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
      "form-action 'self'"
    ].join("; "),
    "Referrer-Policy": "no-referrer",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Permissions-Policy": "geolocation=(), microphone=(), camera=()"
  } as const;
  Object.entries(policies).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

export const config = {
  matcher: "/:path*"
};
