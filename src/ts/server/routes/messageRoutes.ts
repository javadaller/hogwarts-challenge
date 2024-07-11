import express from 'express';
import { postMessage, getMessages } from '../controllers/messageController.js';

const router = express.Router();

router.post('/postMessage', postMessage);

router.get('/getMessages', getMessages);

export default router;

