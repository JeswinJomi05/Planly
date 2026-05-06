import mongoose from "mongoose";
import dns from "dns";

import dotenv from 'dotenv';
dotenv.config();
dns.setServers(["1.1.1.1","8.8.8.8"]);

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log("MONGODB CONNECTED SUCCESSFULLY!");
  } catch (error) {
    console.error("Error connecting to MONGODB", error);
    process.exit(1); // exit with failure
  }
};