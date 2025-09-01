import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

const getCookieOptions = () => {
    const isProduction = process.env.NODE_ENV === 'production';
    return {
        httpOnly: true,
        secure: isProduction,
        maxAge: 7 * 60 * 60 * 1000,
        sameSite: isProduction ? 'none' : 'lax',
    };
};

export const register = async (req, res) => {
    try {
        const { fullname, email, password, role } = req.body;
        const profilePic = req.file?.filename || null;

        if(profilePic === null) {
             return res.status(400).json({ message: "Required fields cannot be empty." });
        }

        if (!fullname || !email || !password || !role) {
            return res.status(400).json({ message: "Required fields cannot be empty." });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Sorry, the user already exists." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            fullname,
            email,
            password: hashedPassword,
            role,
            profilePic,
        });

        const token = await generateToken(newUser.email, newUser.fullname, newUser._id, newUser.role,newUser.profilePic);

        await newUser.save();

        res.cookie('token', token, getCookieOptions());

        return res.status(201).json({ message: "New user registered successfully.", authUser: newUser });

    } catch (error) {
        console.log("Error in register controller:", error);
        res.status(500).json({ message: "Internal Server Error." });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Required fields cannot be empty." });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Either your email or password is incorrect." });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Either your email or password is incorrect." });
        }

        const loggedInUser = {
            fullname: user.fullname,
            email: user.email,
            id: user._id,
            role: user.role,
            profilePic: user.profilePic,
        };

        const token = await generateToken(user.email, user.fullname, user._id, user.role,user.profilePic);

        res.cookie('token', token, getCookieOptions());

        res.status(200).json({ message: "Logged in Successfully.", authUser: loggedInUser });

    } catch (error) {
        console.log("Error in login controller:", error);
        res.status(500).json({ message: "Internal Server Error." });
    }
};

export const logout = (req, res) => {
    try {
        res.clearCookie('token', getCookieOptions());
        res.status(200).json({ message: 'Logged out successfully.' });
    } catch (error) {
        console.log("Error in logout controller:", error);
        res.status(500).json({ message: "Internal Server Error." });
    }
};

export const getAllBorrowers = async (req, res) => {
    try {
        const allBorrowers = await userModel.find({ role: 'borrower' });
        res.status(200).json({ message: "All borrowers fetched successfully.", allBorrowers });
    } catch (error) {
        console.log("Error in getAllBorrowers controller:", error);
        res.status(500).json({ message: "Internal Server Error." });
    }
};
