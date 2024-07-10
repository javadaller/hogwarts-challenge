// db/connect.js
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export async function connectToDB(): Promise<void> {
    await mongoose.connect(process.env.MONGO_URI!)
    console.log('db connected')
}
