import mongoose from "mongoose"

const dbConnect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to mongodb successfully.");
        
    } catch (error) {
        console.log("Error while connecting to database.",error);
        process.exit(1);
    }
}

export default dbConnect;