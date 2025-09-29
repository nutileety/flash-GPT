import mongoose from "mongoose";
import Chat from "../models/chat.js"

// Chat creation API
export const createChat = async (req, res) => {
    try{
        const userId = req.user._id;
    
        const chatData  = {
            userId,
            message: [],
            name: "New Chat",
            userName: req.user.name
        }

        await Chat.create(chatData)
        return res.json({success: true, message: "Chat created."})
    }
    catch(error) {
        return res.json({success:false, message: error.message})
    }
}

// get Chats API
export const getChat = async (req, res) => {
    try { 
        const userId = req.user._id;
        const chats = await Chat.findOne({userId}).sort({updateAt: -1});
        return res.json({success: true, chats})
    }
    catch(error) {
        return res.json({success: false, message: error.message})
    }
}

// deleting chats API
export const deleteChat = async (req, res) => {
    try {
        const userId = req.user._id;
        const { chatId } = req.body;

        await Chat.deleteOne({_id: chatId, userId});
        return res.json({success: true, message: "Chat Deleted."})
    }
    catch(error) {
        return res.json({success:false, message: error.message})
    }

}
