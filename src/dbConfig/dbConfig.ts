import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const db = mongoose.connection;
    db.on("connected", () => console.log("MongoDB connected successfully"));
    db.on("error", (error) => console.log("MongoDB connection error:", error));
    
  } catch (error) {
    console.log("Error while connecting DB:", error);
  }
}
