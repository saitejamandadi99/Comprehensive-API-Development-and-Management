const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const registerUser = async (req , res)=>{
    try {
        const {name, email, phone_no, password} = req.body;
        const existingUser = await User.findOne({
            $or: [{email}, {phone_no}]
        }); 
        if (existingUser){
            return res.status(400).json({message: 'User already exists with this email/phone_no.'})
        }
        const hashedPassword = await bcrypt.hash(password, 10); 
        const newUser = new User({
            name, 
            email, 
            phone_no, 
            password:hashedPassword
        })
        await newUser.save(); 
        return res.status(201).json({message: 'User registered successfully', userId: newUser._id})
    } catch (error) {
        console.error('Error in registerUser:', error.message);
        return res.status(500).json({message: error.message})
        

    }
}


const loginUser = async (req, res)=>{
    try {
        const {email, password} = req.body; 
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(400).json({message: 'User does not exist with this email.'})
        }
        const isPasswordValid = await bcrypt.compare(password,existingUser.password);
        if(!isPasswordValid){
            return res.status(400).json({message: 'Invalid password.'})
        }
        const token = jwt.sign({userId: existingUser._id},process.env.JWT_SECRET, {expiresIn : '1h'})
        return res.status(200).json({message: 'Login Successfully Completed', userId:existingUser._id, token:token});
    } catch (error) {
        console.error('Error in loginUser:', error.message);
        return res.status(500).json({message: error.message})
        
    }
}

module.exports = {registerUser, loginUser}