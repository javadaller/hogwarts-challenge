import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export async function connectToDB(): Promise<void> {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}
