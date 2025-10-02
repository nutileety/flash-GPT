import Chat from '../models/chat';

export const textMessageController = async (req, res) => {
    try{
        const userId = req.user._id;
        const { chatId, prompt } = req.body;

        const chat = await Chat.findOne({userId, _id:chatId});
        chat.message.push({
            role:'user', 
            content: prompt, 
            isPublished: false, 
            timestamp: Date.now(),
            isImage: false    
        })

        
    }
    catch(error) {
        return res.json({success: false, message: error.message});
    }
}  