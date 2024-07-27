import User from "../models/user.model.js"

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { errorHandler } from "../utils/error.js"
export const signup = async (req, res, next) => {
    const { username, email, password, confirmPassword, firstName, lastName } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json('Passwords do not match');
    }

    // Hash the password using bcrypt
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({ username, email, password: hashedPassword,firstName, lastName });

    try {
        await newUser.save();
        res.status(201).json('User created successfully');
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};
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
            res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)
            // Sam Vasishat samvasishat90416
        }
        else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8) // last 8 digit no of password generated with 26 letts plus 1-9 numbers
            const hashedPassword = bcrypt.hashSync(generatedPassword,10) // will hash the password 10
            const newUser = new User({
                username:req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-8),
                email:req.body.email,
                password:hashedPassword,
                avatar:req.body.photo
            })
            await newUser.save()
            const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET);
            const {password:pass, ...rest} = newUser._doc;
            res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)
        }
    }catch(e){
        next(e)
    }
}

export const signout = async(req,res,next) => {
    try{
        res.clearCookie('access_token')
        res.status(200).json('Signed out successfully')
    }catch(e){
        next(e)
    }
}