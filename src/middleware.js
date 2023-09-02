import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const myTokenName = req.cookies.get("myTokenName");

  if (!myTokenName)
  return NextResponse.redirect(new URL("/login", req.url));

  // this condition avoid to show the login page if the user is logged in
  if (myTokenName) {
    if (req.nextUrl.pathname.includes("/login")) {
      try {
        await jwtVerify(myTokenName.value, new TextEncoder().encode("yoursecret"));
        return NextResponse.redirect(new URL("/", req.url));
      } catch (error) {
        return NextResponse.next();
      }
    }
  }

  try {
    const { payload } = jwtVerify(
       myTokenName.value,
      new TextEncoder().encode("yoursecret")
    );
    console.log(payload)
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 403 });
  }
}

export const config = {
  matcher: ["/", "/tasks/new", "/dashboard", "/signout"],
};
