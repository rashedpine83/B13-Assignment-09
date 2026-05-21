import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/signup", request.url));
}

export const config = {
  matcher: ["/add-tutor/:path*", "/my-tutors/:path*", "/my-booked/:path*"],
};
