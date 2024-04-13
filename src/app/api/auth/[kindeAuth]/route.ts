import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";

export const GET = async (req: any, res: any) => {
  try {
    const authHandler = handleAuth();
    const result = await authHandler(req, res);
    return result;
  } catch (error) {
    console.error("Authentication error:", error);
    throw error;
  }
};