import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {

}

export const config = {
  matcher: ["/dashboard"],
};
