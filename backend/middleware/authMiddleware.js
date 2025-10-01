const jwt = require('jsonwebtoken'); 
const User = require('../models/userModel');

const authMiddleware = async (req , res , next)=>{
    try {
        const token = req.headers.authorization?.split(' ')[1]; 
        if(!token){
            return res.status(401).json({message: 'No token provided, authorization denied.'})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        const user = await User.findById(decoded.userId).select('-password'); 
        if(!user){
            return res.status(401).json({message: 'User not found, authorization denied.'})
        }
        req.user = user; 
        next();
        
    } catch (error) {
        console.error('Error in authMiddleware:', error.message);
        return res.status(500).json({message: 'Server Error in authMiddleware'})
    }
}

module.exports = authMiddleware;