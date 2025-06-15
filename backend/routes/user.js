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
const Notice = require('../models/Notice');
const fetchUser = require('../middleware/fetchUser');
const Event = require('../models/Event')

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

        let imageUrl = '';
        if (req.file) {
            const localFilePath = req.file.path;
            const userImageUpload = await uploadOnCloud(localFilePath);

            imageUrl = userImageUpload.secure_url;
            fs.unlinkSync(localFilePath);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        var user = await User.create({
            name,
            userImage: imageUrl,
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
        console.log(error);
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

//ROUTE 3 : To get all teh notices for the user of specific society '/get-notice'
router.get('/get-notices',fetchUser,async(req,res)=>{
    try {
        const user = await User.findById(req.user.id);
        if(!user || !user.society){
            return res.status(400).json({message:"User or society not found"});
        }
        const notice = await Notice.find({society:user.society}).sort({ createdAt: -1 });
        res.status(200).json({message:"Notice fetched successfully",notice});
    } catch (error) {
        return res.status(500).json({message:"Internal Server error"});
    }
})

// ROUTE 4 : To get all events for teh user of specific society '/get-events'
router.get('/get-events',fetchUser,async(req,res)=>{
    try {
        const user = await User.findById(req.user.id);
        if(!user || !user.society){
            return res.status(400).json({message:"User os society not found"});
        }
        const event = await Event.find({society:user.society});
        res.status(200).json({message:"Event Fetched Successfully", event});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Some error occured. Cannot fetch events!!"});
    }
})


module.exports = router