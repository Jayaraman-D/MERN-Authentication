import bcrypt from 'bcryptjs'
import userModel from '../models/userModel.js';
import generateToken from '../utils/token.js';
import transporter from '../config/nodemailer.js';
import crypto from "crypto";


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


        await newUser.save();
        generateToken(newUser._id, res);

        // welcome email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to the great karikalan magic show",
            text: ` Hi ${name}! Welcome to the great karikalan majic show. Your account has been created with the email id: ${email}`
        }
        await transporter.sendMail(mailOptions);

        return res.status(201).json({ success: true, message: "Signup successful" })



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

export const sendVerifyOtp = async (req, res) => {
    try {

         const userId = req.user._id;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.isAccountVerified) {
            return res.status(400).json({ success: false, message: "Email is already verified" })
        }

        const otp = crypto.randomInt(100000, 1000000).toString();
        user.verifyOtp = otp;
        user.verifyOtpExprieAt = Date.now() + 24 * 60 * 60 * 1000

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Account Verification OTP",
            text: `Hi ${user.name} your otp is ${otp} for account verification. please dont share anyone`
        }

        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: "Verification OTP has been sent to your email" });


    } catch (error) {
        console.log(`Error occured in send verify otp controller: ${error.message}`);
        res.status(500).json({ message: "Internal server error", success: false })
    }
}

export const verifyEmail = async (req, res) => {

    const {otp } = req.body;
     const userId = req.user._id;
    if (!userId || !otp) {
        return res.status(400).json({ success: false, message: "Missing details" })
    }

    try {

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.status(400).json({ success: false, message: "Invalid OTP" })
        }

        if (user.verifyOtpExprieAt < Date.now()) {
            return res.status(400).json({ success: false, message: "OTP has expired" })
        }

            user.isAccountVerified = true;
            user.verifyOtp = '';
            user.verifyOtpExprieAt = 0        

        await user.save();

        res.status(200).json({ success: true, message: "Email has been verified" })

    } catch (error) {
        console.log(`Error occured in verify email controller: ${error.message}`);
        res.status(500).json({ message: "Internal server error", success: false })
    }
}