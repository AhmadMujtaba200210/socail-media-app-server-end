import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
// WRITING AUTHENTICATION API
// we have created it async because we are accessing the database at real time simultaneously, req: anything asked from frontend is called as request,
// res: anything in return of that request,response came from backend ,is called response
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;// from the frontend we will receive the body parameter which is having all the data mentioned in the const

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);// creating a password hash by using the password parameter from the req body
        // we are going to encrypt the password and save it and once user asked the password we wil decode it again and return as jason web token
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        });
        const savedUser = await newUser.save();
        // once the new user is saved we will send a status code of 201 and also the new saved user in response body
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* LOGGING IN */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: "User does not exist. " });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

        const token = jwt.sign({ id: user._id }, "secret");
        delete user.password;
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
