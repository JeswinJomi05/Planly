import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["1.1.1.1","8.8.8.8"]);

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://arokovendi_db_user:tqhkMR3YbAyng7Rm@cluster0.pewzrbj.mongodb.net/notes_db?appName=Cluster0");
    console.log("MONGODB CONNECTED SUCCESSFULLY!");
  } catch (error) {
    console.error("Error connecting to MONGODB", error);
    process.exit(1); // exit with failure
  }
};