import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";

export const GET = async (req: any, res: any) => {
  try {
    const authHandler = handleAuth();
    const result = await authHandler(req, res);
    console.log('Authentication result:', result);
    return result;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error; // Rethrow the error to handle it appropriately
  }
};