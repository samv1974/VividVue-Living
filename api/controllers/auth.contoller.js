import User from "../models/user.model.js"

import jwt from 'jsonwebtoken'
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


export const signin = async(req,res,next) => {
    // console.log(req.body)
    const {email,password} = req.body

    try{
        const validUser = await User.findOne({email});
        if(!validUser) {
            return next(errorHandler(404,'user not found'))
        }
        const validPassword = bcrypt.compareSync(password,validUser.password)
        if(!validPassword) {
            return next(errorHandler(401,'Wrong credential!'))
        }
        const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET)
        const {password:pass,...rest} = validUser._doc

        res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)
    }catch(e){
        // res.status(500).json(e.message)
        // we will have a function to handle the error
        next(e); // error handling from our middleware (thats why we used next)
        // next(errorHandler(550,'error from a function'))
    }
} 

export const google = async (req,res,next) => {
    try{
        const user = await User.findOne({email:req.body.email})
        if(user){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
            const {password:pass,...rest}=user._doc
        }
    }catch(e){
        next(error)
    }
}