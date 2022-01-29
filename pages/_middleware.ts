// pages/_middleware.ts
import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import type { NextApiRequest } from "next";
type MYReq = NextApiRequest & NextRequest;
export async function middleware(req: MYReq, ev: NextFetchEvent) {
  if (req.nextUrl.pathname === "/") {
    const session = await getToken({
      req,
      secret: process.env.SECRET as string,
      secureCookie: process.env.NODE_ENV === "production",
    });
    if (!session) return NextResponse.redirect("/home");
  }
}
