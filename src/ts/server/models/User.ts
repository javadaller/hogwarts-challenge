// models/User.ts
import mongoose, { Schema, Document } from 'mongoose';
const validator = require('validator')

export interface User extends Document {
    name: string;
    email: string;
    house: string;
    password: string;
}

const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email format'
        }
    },
    house: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

export default mongoose.model<User>('User', userSchema);
