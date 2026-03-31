import { NextResponse } from "next/server";

export async function middleware(req) {
  const { nextUrl: url, geo } = req;
  url?.searchParams?.set("country", geo?.country ?? "US");
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: "/content/:path*",
};
