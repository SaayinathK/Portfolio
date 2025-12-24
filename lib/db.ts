import mongoose from "mongoose";

const dbConnect = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not set in environment variables.");
  }

  await mongoose.connect(uri);

  console.log("✅ MongoDB Atlas connected");
};

export default dbConnect;
