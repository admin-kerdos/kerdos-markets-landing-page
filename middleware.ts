import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(_: NextRequest) {
  const response = NextResponse.next();
  const isProduction = process.env.NODE_ENV === "production";
  const scriptSrc = isProduction ? "'self'" : "'self' 'unsafe-inline' 'unsafe-eval'";
  const styleSrc = isProduction ? "'self'" : "'self' 'unsafe-inline'";
  const policies = {
    "Content-Security-Policy": [
      "default-src 'self'",
      `script-src ${scriptSrc}`,
      `style-src ${styleSrc}`,
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
