import express from 'express'
import { config } from 'dotenv';
import dbConnect from './utils/dbConnect.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js'
import booksRouter from './routes/book.route.js'
import cors from "cors"
import { checkAuth } from './middlewares/checkAuth.js';

config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(cookieParser());


app.use('/uploads', express.static('uploads'));
app.use('/api/auth', authRouter);
app.use('/api/books', booksRouter);
app.use('/api/check', checkAuth, (req,res) => {
    console.log("User is authenticated.");
    res.status(200).json({ message: "User is authenticated.",authUser:req.user});
});

const startServer = async () => {
    await dbConnect();
    app.listen(PORT, () => {
        console.log(`Server is running a port : ${PORT}`);
    })
}

startServer();

