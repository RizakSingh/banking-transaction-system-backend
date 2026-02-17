const userModel = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
/**
 * 
 * - user register controller 
 * - POST /api/auth/register
 */
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(422).json({ message: "User already exists" ,status:"failed"});
        }
        const user = await userModel.create({ name, email, password });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
        res.cookie("token", token);
        await user.save();
        res.status(201).json({ message: "User registered successfully", user:{
            id: user._id,
            name: user.name,
            email: user.email
        }, token });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};
const loginUser = async (req,res)=>{
try{
    const {email,password} = req.body;
    const user = await userModel.findOne({ email }).select('+password');
    if(!user){
        return res.status(404).json({message:"Invalid email or password"});
    }
    const isPasswordValid = await user.comparePassword(password);
    if(!isPasswordValid){
        return res.status(401).json({message:"Invalid password"});
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
    res.cookie("token", token);
    res.status(200).json({ message: "Login successful", user:{
        id: user._id,
        name: user.name,
        email: user.email
    }, token });
}catch(error){
    res.status(500).json({ message: "Error logging in user", error: error.message });
}
}
module.exports = { registerUser, loginUser};