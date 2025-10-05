import Chat from '../models/chat.js';
import User from '../models/user.js';
import axios from  'axios'
import  imagekit  from '../configs/imageKit.js';
import  openai  from '../configs/openai.js';

export const textMessageController = async (req, res) => {
    try{
        const userId = req.user._id;

        if(req.user.credits < 1)
            return res.json({success: false, message: "You doesn't have enough credits."})

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
        
        chat.message.push(reply);
        await chat.save();

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

        const chat = await Chat.findOne({userId, _id:chatId});
        chat.message.push({
            role: 'user', 
            content: prompt, 
            timestamp: Date.now(), 
            isImage: false
        });

        // encode the pompt
        const encodedPrompt = encodeURIComponent(prompt);

        // construct the ai image generation url
        const generatedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/flashgpt/${Date.now()}.png?tr=w-800,h-800`;
        console.log("Generated image URL:", generatedImageUrl);

        // fetching the image generation response from ImageKit
        const aiImageResponse = await axios.get(generatedImageUrl, {
            responseType: "arraybuffer"
        })
        console.log("aim", aiImageResponse.data)

        // convert to base64 image
        const base64Image = `data:image/png;base64,${Buffer.from(aiImageResponse.data,
            "binary").toString('base64')}`;
            
        const uploadResponse = await imagekit.upload({
            file: base64Image,
            fileName: `${Date.now()}.png`,
            folder: 'flashgpt'
        });

        const reply = {
            role: 'assistant',
            content: uploadResponse.url,
            timestamp: Date.now(),
            isImage: true,
            isPublished
        }

        res.json({success: true, reply});

        chat.message.push(reply);
        await chat.save();
        await User.updateOne({_id: userId}, {$inc: {credits: -2}}); 
    }
    catch(error) {
        return res.json({success: false, message: error.message})
    }
}