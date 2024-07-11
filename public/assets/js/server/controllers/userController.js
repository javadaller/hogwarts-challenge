import { connectToDatabase } from '../db/db.js';
import { randomInt } from '../../helpers/functions.js';
import bcrypt from 'bcrypt';
const saltRounds = 10;
export const registerUser = async (req, res) => {
    try {
        let { name, emailRegister, houseRegister, passwordRegister, repeatPassword } = req.body;
        if (!name || !emailRegister || !houseRegister || !passwordRegister || passwordRegister !== repeatPassword) {
            res.status(400).json({ message: 'Invalid input' });
            return;
        }
        //Random House
        if (houseRegister == 'Random') {
            const index = randomInt(0, 3);
            const array = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];
            houseRegister = array[index];
        }
        const db = await connectToDatabase();
        const usersCollection = db.collection('users');
        const existingUser = await usersCollection.findOne({ email: emailRegister });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        const hashedPassword = await bcrypt.hash(passwordRegister, saltRounds);
        const result = await usersCollection.insertOne({
            name,
            email: emailRegister,
            house: houseRegister,
            password: hashedPassword,
        });
        res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: 'Invalid input' });
            return;
        }
        const db = await connectToDatabase();
        const usersCollection = db.collection('users');
        const user = await usersCollection.findOne({ email });
        if (!user) {
            res.status(400).json({ message: 'User not found' });
            return;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: 'Incorrect password' });
            return;
        }
        res.status(200).json({ userId: user._id, name: user.name, house: user.house });
    }
    catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
