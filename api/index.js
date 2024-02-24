import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';


// initialize dotenv
dotenv.config();

mongoose.connect(process.env.Mongo).then(() => {
    console.log('connected to db')
}).catch((err) => {
    console.log(err);
})
// created the server and running the server on port 3000
const app = express();
app.use(express.json());

app.listen(3000,() => {
    console.log('server is running on port 3000!!!!')
});
app.use('/api/user',userRouter); // app.use to create api route
app.use('/api/auth',authRouter); // app.use to create api route
app.use('/api/listing', listingRouter);

// lets setup the middleware

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})