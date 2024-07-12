import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;
let client;
let db;
export const connectToDatabase = async () => {
    if (!client) {
        try {
            client = new MongoClient(uri);
            await client.connect();
            db = client.db(dbName);
            console.log(`Connecté à la base de données: ${dbName}`);
        }
        catch (error) {
            console.error('Erreur de connexion à la base de données:', error);
            throw error;
        }
    }
    return db;
};
export const disconnectFromDatabase = async () => {
    if (client) {
        await client.close();
        console.log(`Déconnecté de la base de données: ${dbName}`);
    }
};
