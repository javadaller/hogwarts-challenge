import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
export async function connectToDB() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('db connected');
}
