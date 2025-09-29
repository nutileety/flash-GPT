import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import chatRouter from './routes/chatRoutes.js';

const app = express();
await connectDB();

// middlewares
app.use(cors())
app.use(express.json())

//routes
app.get('/', (req, res) => {
    res.send("Server is live.");
})
app.use('/api/user', userRouter)
app.use('/api/chat', chatRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`The server is started on port ${PORT}`)
})