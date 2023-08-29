import mongoose from "mongoose";

let isConnected = false;
export const connectDB = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URL) return console.log("MONGODB_URL not found");
  try {
    if (isConnected) {
      return;
    } else {
      await mongoose.connect(process.env.MONGODB_URL);
      isConnected = true;
    }
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;
