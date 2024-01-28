import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

// initialize dotenv
dotenv.config();

mongoose.connect(process.env.Mongo,{ useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('connected to db')
}).catch((err) => {
    console.log(err);
})
// created the server and running the server on port 3000
const app = express();

app.listen(3000,() => {
    console.log('server is running on port 3000!!!!')
});

// now lets connect with db