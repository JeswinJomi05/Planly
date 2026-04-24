import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["1.1.1.1","8.8.8.8"]);

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://jeswinthedeveloper_db_user:RoJkh4bElVNlFeSf@cluster0.gu7vaa1.mongodb.net/?appName=Cluster0");
    console.log("MONGODB CONNECTED SUCCESSFULLY!");
  } catch (error) {
    console.error("Error connecting to MONGODB", error);
    process.exit(1); // exit with failure
  }
};