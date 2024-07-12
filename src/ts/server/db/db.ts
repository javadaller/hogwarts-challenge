import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI as string;
const dbName = process.env.DB_NAME as string;

let client: MongoClient;
let db: Db;

export const connectToDatabase = async (): Promise<Db> => {
  if (!client) {
    try {
      client = new MongoClient(uri);
      await client.connect();
      db = client.db(dbName);
      console.log(`Connecté à la base de données: ${dbName}`);
    } catch (error) {
      console.error('Erreur de connexion à la base de données:', error);
      throw error;
    }
  }
  return db;
};

export const disconnectFromDatabase = async (): Promise<void> => {
  if (client) {
    await client.close();
    console.log(`Déconnecté de la base de données: ${dbName}`);
  }
};
