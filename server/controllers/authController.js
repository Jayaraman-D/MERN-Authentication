import bcrypt from 'bcryptjs'
import userModel from '../models/userModel.js';
import generateToken from '../utils/token.js';

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" })
    }
    try {
        const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegExp.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" })
        }

        const existingEmail = await userModel.findOne({ email })
        if (existingEmail) {
            return res.status(400).json({ success: false, message: "Email is already exist" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            name,
            password: hashedPassword,
            email
        })

        if (newUser) {
            await newUser.save();
            generateToken(newUser._id, res);
            return res.status(200).json({ success: true, message: "Signup successful" })
        }


    } catch (error) {
        console.log(`Error occured in signup controller: ${error.message}`);
        res.status(500).json({ message: "Internal server error", success: false })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Both email and password are required" })
    }

    try {

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, message: "email does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Password does not match" })
        }

        generateToken(user._id, res);
        return res.status(200).json({ success: true, message: "Login successful" })

    } catch (error) {
        console.log(`Error occured in login controller: ${error.message}`);
        res.status(500).json({ message: "Internal server error", success: false })
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 0 });
        res.status(200).json({ success: true, message: 'Logout successful' })
    } catch (error) {
        console.log(`Error occured in logout controller: ${error.message}`);
        res.status(500).json({ message: "Internal server error", success: false })
    }
}