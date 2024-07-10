import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { connectToDatabase } from './db/db.js';
import userRoutes from './routes/userRoutes';
import messageRoutes from './routes/messageRoutes';
dotenv.config();
connectToDatabase();
const app = express();
app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
