import express from 'express';
import { protect } from '../middlewares/auth.js';
import { imageMessageController, textMessageController } from '../controllers/messageController.js';

const messageRoutes = express.Router();

messageRoutes.post('/text', protect, textMessageController);
messageRoutes.post('/image', protect, imageMessageController);

export default messageRoutes;