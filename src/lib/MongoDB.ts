import mongoose from "mongoose";

export const mongoDB = async () => {
  try {
    mongoose
      .connect(process.env.MONGODB_URI!, {
        family: 4,
      })
      .then(() => console.log("Connected !!"))
      .catch((e) => console.log(e));
  } catch (e) {
    console.log(e);
  }
};
