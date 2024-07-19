import { AuthMiddleware } from "@/Middleware/AuthMiddleware";
import UserModel from "@/models/user";
import { ApiUser } from "@/types/types";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const PUT = async (req: NextRequest, res: NextResponse) => {
  try {
    const result = await AuthMiddleware(req);
    // If middleware returns NextResponse.next(), proceed with API logic
    if (result.status==200) {
        
        const {firstName, lastName} = await req.json();
        
        if(!firstName || !lastName ){
            return NextResponse.json(`Access Denied!!`, {status:404});
        }

        const user: ApiUser = JSON.parse(req.headers.get("user") || "{}");

        await UserModel.updateOne({_id:user._id},{firstName, lastName});

      return NextResponse.json({ status: "Updated" }, { status: 200 });
    } else {
      // Handle any errors from the middleware
      return result;
    }
  } catch (error) {
    console.error("Error in health endpoint:", error);
    return NextResponse.json({ message: 'Error occurred!' }, { status: 500 });
  }
};