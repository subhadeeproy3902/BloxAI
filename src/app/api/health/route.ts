import { AuthMiddleware } from "@/Middleware/AuthMiddleware";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const result = await AuthMiddleware(req);
    // If middleware returns NextResponse.next(), proceed with API logic
    if (result.status==200) {
      return NextResponse.json({ status: "UP" }, { status: 200 });
    } else {
      // Handle any errors from the middleware
      return result;
    }
  } catch (error) {
    console.error("Error in health endpoint:", error);
    return NextResponse.json({ message: 'Error occurred!' }, { status: 500 });
  }
};