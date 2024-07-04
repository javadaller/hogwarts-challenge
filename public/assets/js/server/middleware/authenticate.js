import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.SECRET_KEY; // Utilisez la même clé secrète que celle utilisée pour générer les JWT
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            res.status(403).json({ message: 'Token expired or invalid' });
            return;
        }
        // Ajoutez les données décodées (comme l'ID d'utilisateur) à l'objet req pour les utiliser dans les routes protégées
        req.body.userId = decoded.userId;
        next();
    });
};
