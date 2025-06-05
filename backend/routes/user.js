const express = require ('express');
const router = express.Router();
const User = require('../models/User');
const {body,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const {uploadOnCloud} = require('../utils/cloudinary');
const {upload} = require('../middleware/multer.middleware');
const fs = require('fs')
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

// ROUTE 1: Post route to create a user '/signUp'
router.post('/signUp',upload.single('userImage') ,[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Enter a valid password').isLength({min:5})
],async(req,res)=>{
    const result = validationResult(req)
    if(!result.isEmpty()){
        return res.status(400).json({error:result.array()});
    }
    try {
        const {name,email,password,gender,society} = req.body;
        var user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:"Sorry! a user with this email is already registered"});
        }

        if(!req.file){
            return res.status(400).json({message:"A image is requiered"})
        }

        const localFilePath = req.file.path;
        const userImageUpload = await uploadOnCloud(localFilePath)
        fs.unlinkSync(localFilePath);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        var user = await User.create({
            name,
            userImage: userImageUpload.secure_url,
            email,
            password: hashedPassword,
            gender,
            society
        })

        const data = {
            users:{
                id: user._id.toString()
            }
        }

        const authToken = jwt.sign(data,process.env.JWT_SECRET);
        res.status(200).json({message:"Account created Successfully and request is send to the admin",user,authToken});

    } catch (error) {
        return res.status(500).json({message:"Internal Server error"});
    }
});

// ROUTE 2 : login a user '/login' no login required
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Enter a valid password').isLength({min:5})
], async(req,res)=>{
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).json({error : result.array()});
    }
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({ message: "Invalid email or password." });
        }

        const isMatched = await bcrypt.compare(password,user.password);
        if(!isMatched){
            return res.status(400).json({message:"Invalid credentials! Please login with the correct credentials"});
        }

        if(!user.isValid){
            return res.status(400).json({message: "Your account is pending approval. Please wait until an admin reviews and approves your registration."})
        }

        const data = {
            users:{
                id: user._id.toString()
            }
        }

        const authToken = jwt.sign(data,process.env.JWT_SECRET);
        res.status(200).json({message:"Logged in Successfully",user,authToken});
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({message:"Internal Server Error"});
    }
})


module.exports = router