import User from "../models/user.model.js"

import bcrypt from 'bcryptjs'
import { errorHandler } from "../utils/error.js"

export const signup = async(req,res,next) => {
    // console.log(req.body)
    const {username,email,password} = req.body

    const hashed_pass = bcrypt.hashSync(password,10) // will hash the password 10 is a hash variable which will make the hashing implemented


    const newUser = new User ({username,email,password: hashed_pass})

    try{
        await newUser.save() //wil save inside the database // this save takes time
        res.status(201).json('user crated succesfully');

    }catch(e){
        // res.status(500).json(e.message)
        // we will have a function to handle the error
        next(e); // error handling from our middleware (thats why we used next)
        // next(errorHandler(550,'error from a function'))
    }

} 