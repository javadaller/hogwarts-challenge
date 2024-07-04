import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import userRoutes from './public/assets/js/server/routes/userRoutes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 4000

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())

app.use('/api/users', userRoutes)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`)
});
