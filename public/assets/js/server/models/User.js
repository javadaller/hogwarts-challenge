// models/User.ts
import mongoose, { Schema } from 'mongoose';
const validator = require('validator');
const userSchema = new Schema({
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
export default mongoose.model('User', userSchema);
