import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import User from "../models/user";


// tokenization of the user
const generateToken = (id) => {
    return jwt.sign({id}, JWT_SECRET, {expiresIn: "30d"});
}

// user Registration API
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try{
        const userExists = await User.findOne({email});

        if(userExists)
            return res.json({success: false, message: "User already exists!"})

        const user = await User.create({name, email, password});
        const token = generateToken(user._id);
        return res.json({success: true, token, message: "User Resgistered Successfully."})
    }
    catch(error) {
        return res.json({success: false, message: error.message})
    } 
}

// user login API
export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    
    if(user) {
        const isMatch = bcrypt.compare(password, user.password);
        try{
            if(isMatch) {
                const token = generateToken(user._id);
                return res.json({success: true, token, message:"Login Successfully."});
            }
            return res.json({success: false, message: "Invalid user credentials."})
        }
        catch(error) {
            return res.json({success: false, message: error.message})
        }
        
        
    }
}

// get user API
export const getUser = async (res, req) => {
    try{
        const user = req.body;
        return res.json({sucess: true, user})
    }
    catch(error) {
        return res.json({success: false, message: error.message})
    }
}
    