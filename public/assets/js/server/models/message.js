// src/models/messageModel.ts
import mongoose, { Schema } from 'mongoose';
const messageSchema = new Schema({
    text: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    chatRoomId: { type: String, required: true }
});
const Message = mongoose.model('Message', messageSchema);
export default Message;
