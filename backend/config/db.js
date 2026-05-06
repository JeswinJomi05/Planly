import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["1.1.1.1","8.8.8.8"]);

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://jeswinthedeveloper_db_user:UIkTa0rJYXM75QTR@cluster0.o8tpput.mongodb.net/notes_db?appName=Cluster0");
    
    console.log("MONGODB CONNECTED SUCCESSFULLY!");
  } catch (error) {
    console.error("Error connecting to MONGODB", error);
    process.exit(1); // exit with failure
  }
};