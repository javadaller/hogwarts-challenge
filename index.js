import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectToDB } from './public/assets/js/server/db/connect.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

connectToDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Serveur démarré sur http://localhost:${PORT}`);
    });
}).catch(error => {
    console.error('Failed to connect to MongoDB', error);
});
