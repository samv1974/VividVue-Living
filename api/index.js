import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import contactRouter from './routes/contact.route.js'; // Import contact route
import cookieParser from 'cookie-parser';
import cors from 'cors';
// initialize dotenv
dotenv.config();


app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
  }));  


mongoose.connect(process.env.Mongo).then(() => {
    console.log('connected to db');
}).catch((err) => {
    console.log(err);
});

// Create the server and run it on port 3000
const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
    console.log('server is running on port 3000!!!!');
});

// Use routers
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);
app.use('/api/contact', contactRouter); // Use contact route

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
