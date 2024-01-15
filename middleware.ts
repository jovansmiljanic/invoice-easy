// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.includes("/api/") ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }

  // Read the cookie named 'userLanguage'
  const userLanguage = req.cookies.get("lang");

  if (req.nextUrl.locale === "default") {
    return NextResponse.redirect(
      new URL(
        `/${userLanguage?.value ? userLanguage?.value : "en"}${
          req.nextUrl.pathname
        }`,
        req.url
      )
    );
  }
}
