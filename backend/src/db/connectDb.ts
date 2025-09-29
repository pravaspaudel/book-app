import mongoose from "mongoose";

async function connectDB(url: string): Promise<void> {
  try {
    await mongoose.connect(url);
    console.log("database connected successfully");
  } catch (err) {
    console.log("error in connecting to db", err);
    process.exit(1);
  }
}

export default connectDB;
