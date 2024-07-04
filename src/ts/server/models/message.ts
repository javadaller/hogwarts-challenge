// src/models/messageModel.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IMessage extends Document {
    text: string;
    author: string;
    createdAt: Date;
    chatRoomId?: string;
}

const messageSchema: Schema = new Schema({
    text: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    chatRoomId: { type: String, required: true }
});

const Message = mongoose.model<IMessage>('Message', messageSchema);

export default Message;
