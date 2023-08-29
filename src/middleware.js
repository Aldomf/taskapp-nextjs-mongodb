import { NextResponse } from "next/server";
import Jwt from "jsonwebtoken";

export function middleware(req) {
  const myTokenName = req.cookies.get("myTokenName");

  if (!myTokenName)
  return NextResponse.redirect(new URL("/login", req.url));

  Jwt.verify(myTokenName, "yoursecret", (err, user) => {
    if (err)
      return NextResponse.json({ message: "Invalid token" }, { status: 403 });

    req.user = user;
  });
}

export const config = {
  matcher: ["/", "/tasks/new", "/dashboard/", "/signout"],
};
