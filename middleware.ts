// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import jwt from "jsonwebtoken";
// import User from "@/models/user";
// import { mongoDB } from "@/lib/MongoDB";

// export async function middleware(req: NextRequest) {
//   try {
//     const token : any = req.cookies.get('accessToken') || req.headers.get('Authorization')?.replace('Bearer ', '');
//     console.log(token)

//     if (!token) {
//       return NextResponse.json({ error: 'Unauthorized Access!' }, { status: 401 });
//     }


//     const decodedToken : any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);

//     await mongoDB();
//     const user = await User.findById(decodedToken._id).select('-password -refreshToken');

//     if (!user) return NextResponse.json({ error: 'Unauthorized Access!' }, { status: 401 });

//     // Pass user data in request headers for further processing in API route
//     req.headers.set('user', JSON.stringify(user));
    
//     return NextResponse.next();
//   } catch (err) {
//     console.log(err);
//     return NextResponse.json({ message: 'Error occurred!' }, { status: 500 });
//   }
// }

// export const config = {
//   matcher: ['/api/:path*'],
// };
