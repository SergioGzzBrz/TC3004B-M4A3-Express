import mongoose from "mongoose";

export const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGOGB_URI)
        console.log("Connected successfully!")
    } catch {
        console.error("Error when connecting to mongo :(")
    }
}