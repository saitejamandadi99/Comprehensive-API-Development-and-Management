const User = require('../models/userModel');

//get all users 

const getAllUsers = async (req , res) =>{
    try {
        const users = await User.find().select('-password') // excludes password 
        if(users.length ===0){
            return res.status(404).json({message: 'No users found '})
        }
        return res.status(200).json({message:'Users fetched successfully' , users})
        
    } catch (error) {
        console.error('Error in getAllUsers:', error.message);
        return res.status(500).json({message: error.message})
    }
}


//get user by id 

const getUserById = async (req, res)=>{
    try {
        const id = req.params.id; 
        const user = await User.findById(id).select('-password');
        if(!user){
            return res.status(404).json({message: 'User not found'})
        }
        return res.status(200).json({message : 'User fetched', user})
        
    } catch (error) {
        console.error('Error in getUserById:', error.message);
        return res.status(500).json({message: error.message})
    }
}


//update user by id 

const updateUserById = async (req, res)=>{
    try {
        const id = req.params.id; 
        const {name, email,phone_no} = req.body;
        const user = await User.findByIdAndUpdate(id, {name, email, phone_no}, {new:true}).select('-password');
        if(!user){
            return res.status(404).json({message: 'User not found'})
        }
        return res.status(201).json({message: 'User updated successfully', user})        
    } catch (error) {
        console.error('Error in updateUserById:', error.message);
        return res.status(500).json({message: error.message})
    }
}

//delete user by id 

const deleteUserById = async (req, res)=>{
    try {
        const id  = req.params.id; 
        const user = await User.findByIdAndDelete(id).select('-password'); 
        if(!user){
            return res.status(404).json({message: 'User not found'})
        }
        return res.status(201).json({message: 'User deleted successfully', user})
        
    } catch (error) {
        console.error('Error in deleteUserById:', error.message);
        return res.status(500).json({message: error.message})
    }
}

module.exports = {getAllUsers, getUserById, updateUserById, deleteUserById}