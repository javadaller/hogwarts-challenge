import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';
import Message from '../models/message.js';
const router = Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
//post message
router.post('/add', async (req, res) => {
    try {
        const { text, author, chatRoomId } = req.body;
        const newMessage = new Message({ text, author, chatRoomId });
        await newMessage.save();
        res.status(201).json({ message: 'Message added', newMessage });
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding message', error });
    }
});
//get messages
router.get('/:chatRoomId', async (req, res) => {
    try {
        const { chatRoomId } = req.params;
        const messages = await Message.find({ chatRoomId });
        res.status(200).json(messages);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching messages', error });
    }
});
//Delete message
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Message.findByIdAndDelete(id);
        res.status(200).json({ message: 'Message deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting message', error });
    }
});
export default router;
