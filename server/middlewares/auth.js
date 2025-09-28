import jwt from "jsonwebtoken"
import User from "../models/user";

export const protect = async (req, res, next) => {
    let token =  req.headers.authorization;
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const user = await User.findOne(userId)

        if(!user)
            return res.json({success: false, message: "User Authorization failed."});

        req.user = user;
        next();
    }
    catch(error) {
        return res.status(401).json({message: "wrong authorization, Token failed!"})
    }
}