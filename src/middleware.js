import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export function middleware(req) {
  const myTokenName = req.cookies.get("myTokenName");

  if (!myTokenName)
  return NextResponse.redirect(new URL("/login", req.url));

  try {
    const { payload } = jwtVerify(
      myTokenName,
      new TextEncoder().encode("yoursecret")
    );
    console.log(payload)
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 403 });
  }
}

export const config = {
  matcher: ["/", "/tasks/new", "/dashboard/", "/signout"],
};
