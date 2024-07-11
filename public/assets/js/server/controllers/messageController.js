import { connectToDatabase } from '../db/db.js';
export const postMessage = async (req, res) => {
    const { name, date, content, house } = req.body;
    if (!name || !date || !content || !house) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const db = await connectToDatabase();
        const collection = db.collection('messages');
        const newMessage = { name, date, content, house };
        await collection.insertOne(newMessage);
        res.status(201).json({ message: 'Message sent successfully', data: { name, date, content, house } });
    }
    catch (error) {
        console.error('Error creating message:', error);
        res.status(500).json({ message: 'An error occurred while sending the message' });
    }
};
export const getMessages = async (req, res) => {
    const { house } = req.query;
    if (!house) {
        return res.status(400).json({ message: 'House parameter is required' });
    }
    try {
        const db = await connectToDatabase();
        const collection = db.collection('messages');
        const messages = await collection.find({ house }).toArray();
        res.status(200).json({ message: 'Messages successfully loaded', data: messages });
    }
    catch (error) {
        console.error('Error getting messages:', error);
        res.status(500).json({ message: 'An error occurred while getting messages' });
    }
};
