const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin'); 
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const {upload} = require('../middleware/multer.middleware');
const {uploadOnCloud} = require('../utils/cloudinary');
const fs = require('fs');
const fetchAdmin = require('../middleware/fetchAdmin');
const Society = require('../models/Society');
const User = require('../models/User');
const Notice = require('../models/Notice');


// ROUTE 1: Post route to create a admin '/signUp'
router.post('/signUp', upload.single('adminImage'), [
  body('name', "Enter a valid name").isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Enter a valid password').isLength({ min: 5 })
], async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ error: result.array() });
  }

  try {
    let admin = await Admin.findOne({ email: req.body.email });
    if (admin) {
      return res.status(400).json({ message: "Sorry! a user with this email already exists" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);

    const localFilePath = req.file.path;
    const adminImageUpload = await uploadOnCloud(localFilePath);
    fs.unlinkSync(localFilePath);

    admin = await Admin.create({
      name: req.body.name,
      adminImage: adminImageUpload.secure_url,
      email: req.body.email,
      password: hashPass,
      gender: req.body.gender
    });

    const data = {
      admins: {
        id: admin._id.toString()
      }
    };

    const authToken = jwt.sign(data, process.env.JWT_SECRET);
    res.json({ message: "Account created successfully", admin, authToken });

  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Internal Server error" });
  }
});

// ROUTE 2: POST to login teh admin using '/login' no login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Enter a valid password').isLength({ min: 5 })
], async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ error: result.array() });
  }

  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email }).populate('society');
    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const matched = await bcrypt.compare(password, admin.password);
    if (!matched) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const data = {
      admins: {
        id: admin._id.toString()
      }
    };
    const authToken = jwt.sign(data, process.env.JWT_SECRET);

    res.status(200).json({ message: "Logged in successfully", admin, authToken });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
});

//ROUTE 3: Create society '/create-society'.
router.post('/create-society',fetchAdmin,async(req,res)=>{
  try {
    const {name,address,city,state,pincode} = req.body;
    var society = await Society.findOne({name});
    if(society){
      return res.status(400).json({message:"A society with this name already exists"});
    }
    society = await Society.create({
      name,
      address,
      city,
      state,
      pincode,
      adminId:req.admin.id
    })
    await Admin.findByIdAndUpdate(req.admin.id,{society: society._id});
    res.status(200).json({message:"Society created Successfully",society})
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
})

//ROUTE 4 : for the admin to check the pendonr request '/pending-request'
router.post('/pending-request',fetchAdmin,async(req,res)=>{
  try {
    const pendingRequests = await User.find({isValid:false}).populate('society');
    if(pendingRequests.length ===0 ){
      return res.status(400).json({message:"No pending request"});
    }

    res.status(200).json({pendingRequests})
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Internal server error"});
  }
})

//ROUTE 5 : for the admin to update the isValid parameter '/approve-request/:id'
router.post('/approve-request/:id',fetchAdmin,async(req,res)=>{
  try {
    const userId = req.params.id;
    const user = await  User.findById(userId);
    if(!user){
      return res.status(400).json({message:"User not found"});
    }
    if(user.isValid){
      return res.status(400).json({message:"Request already acepted"});
    }

    user.isValid = true;
    user.save();

    res.status(200).json({message:"Permission granted",user})
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Internal Server error"});
  }
})

// ROUTE 6: for teh admin to view all the residents
router.get('/viewAllRequests',fetchAdmin,async(req,res)=>{
  try {
    const user = await User.find({isValid:true})
    if(user.length===0){
      return res.status(400).json({message:"Currently no peson in the society"});
    }
    res.status(200).json({message:"Fetched Successfully",user});
  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"Internal Server error"})
  }
})

//ROUTE 7: Reject the request of the user '/reject-request/:id'
router.delete('/reject-request/:id',fetchAdmin,async(req,res)=>{
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if(!user){
      return res.status(500).json({message:"User  not found"});
    }
    res.status(200).json({message:"Request deleted Successfully",user});
  } catch (error) {
    console.log(error)
    return res.status(500).json({messsage:"Internal Server error"});
  }
})

// ROUTE 8: Create a notice for the society '/create-notice'
router.post('/create-notice',fetchAdmin,async(req,res)=>{
  try {
    const {title,content,type} = req.body;
    const notice = await Notice.create({
      title,
      content,
      type,
      society:req.admin.society
    });
    res.status(200).json({message:"Notice created Successfully",notice});
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Internal Server error"});
  }
})

module.exports = router;
