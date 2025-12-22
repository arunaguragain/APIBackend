import mongoose from "mongoose";
import { MONGODB_URI } from "../config";
import { Console } from "console";

export async function connectDatabase() {
    try{
        await mongoose.connect(MONGODB_URI);
        console.log("Databse connected successfully");
    }catch(error){
        console.error("Database Error:", error);
        process.exit(1); //exit application on exception
    }
    
}