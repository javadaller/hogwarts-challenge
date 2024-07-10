import { connectToDatabase } from '../db/db.js';
export const postMessage = async (req, res) => {
    try {
        const { content, posterName, posterId, chatName } = req.body;
        if (!content || !posterName || !posterId || !chatName) {
            res.status(400).json({ message: 'All fields are required.' });
            return;
        }
        const db = await connectToDatabase();
        const messagesCollection = db.collection('messages');
        const newMessage = {
            content,
            timestamp: new Date(),
            posterName,
            posterId,
            chatName,
        };
        const result = await messagesCollection.insertOne(newMessage);
        if (result.acknowledged) {
            res.status(201).json({ ...newMessage, _id: result.insertedId });
        }
        else {
            res.status(500).json({ message: 'Failed to insert message' });
        }
    }
    catch (error) {
        console.error('Error posting message:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};
export const getMessages = async (req, res) => {
    try {
        const { chatName } = req.params;
        const db = await connectToDatabase();
        const messagesCollection = db.collection('messages');
        const messages = await messagesCollection.find({ chatName }).sort({ timestamp: 1 }).toArray();
        res.status(200).json(messages);
    }
    catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};
