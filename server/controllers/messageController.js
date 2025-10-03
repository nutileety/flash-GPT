import Chat from '../models/chat.js';
import User from '../models/user.js'

export const textMessageController = async (req, res) => {
    try{
        const userId = req.user._id;
        const { chatId, prompt } = req.body;

        const chat = await Chat.findOne({userId, _id:chatId});
        chat.message.push({
            role:'user', 
            content: prompt, 
            timestamp: Date.now(),
            isImage: false    
        })

        // chat prompting api
        const { choices } = await openai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [{
                role: "user",
                content: prompt,
            },],
        });

        const reply = {...choices[0].message, timestamp: Date.now(), isImage: false};
        res.json({success: true, reply})
        
        Chat.message.push(reply);
        await Chat.save();

        await User.updateOne({_id: userId}, {$inc: {credits: -1}});

    }
    catch(error) {
        return res.json({success: false, message: error.message});
    }
}  

// Iamge generation controller
export const imageMessageController = async (req, res) => {
    try{
        const userId = req.user._id;

        if(req.user.credits < 2)
            return res.json({success: false, message: "You doesn't have enough credits."})

        const { prompt, chatId, isPublished } = req.body;

        const chat = await Chat.findOne({userId, id: chatId});
        Chat.message.push({
            role: 'user', 
            content: prompt, 
            timestamp: Date.now(), 
            isImage: false
        });
    }
    catch(error) {
        return res.json({success: false, message: error.message})
    }
}