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
const Event = require('../models/Event');
const MarketPlace = require('../models/MarketPlace');
const {sendConfirmationEmail} = require('../utils/email');
const e = require('express');

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

    let imageUrl = '';
      if (req.file) {
        const localFilePath = req.file.path;
        const adminImageUpload = await uploadOnCloud(localFilePath);

        imageUrl = adminImageUpload.secure_url;
        fs.unlinkSync(localFilePath);
      }


    admin = await Admin.create({
      name: req.body.name,
      adminImage: imageUrl,
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
    const authToken = jwt.sign(data, process.env.JWT_SECRET,{ expiresIn: "1h" });

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

//ROUTE 4 : for the admin to check the pending request '/pending-request'
router.post('/pending-request',fetchAdmin,async(req,res)=>{
  try {
    const adminId = req.admin.id;
    const admin = await Admin.findById(adminId);
    const pendingRequests = await User.find({society:admin.society ,isValid:false}).populate('society');
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
    const user = await  User.findById(userId).populate('society');
    if(!user){
      return res.status(400).json({message:"User not found"});
    }
    if(user.isValid){
      return res.status(400).json({message:"Request already acepted"});
    }

    user.isValid = true;
    user.save();
    sendConfirmationEmail(user.society.name, user.email);
    res.status(200).json({message:"Permission granted and mail successfully",user})
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Internal Server error"});
  }
})

// ROUTE 6: for teh admin to view all the residents
router.get('/viewAllRequests',fetchAdmin,async(req,res)=>{
  try {
    const adminId = req.admin.id;
    const admin = await Admin.findById(adminId);
    const user = await User.find({society:admin.society,isValid:true})
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
    return res.status(500).json({message:"Internal Server error"});
  }
})

// ROUTE 8: Create a notice for the society '/create-notice'
router.post('/create-notice',fetchAdmin,async(req,res)=>{
  try {
    const {title,content,type} = req.body;
    const admin = await Admin.findById(req.admin.id)
    const notice = await Notice.create({
      title,
      content,
      type,
      society:admin.society
    });
    res.status(200).json({message:"Notice created Successfully",notice});
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Internal Server error"});
  }
})

//ROUTE 9 : Create a event by the admin '/create-event'
router.post('/create-event',fetchAdmin,upload.single('eventImage'), async (req, res) => {
    try {
      const { title, content, eventDate, venue, organizedBy } = req.body;

      let imageUrl = '';
      if (req.file) {
        const localFilePath = req.file.path;
        const eventImageUpload = await uploadOnCloud(localFilePath);

        imageUrl = eventImageUpload.secure_url;
        fs.unlinkSync(localFilePath); 
      }

      const admin = await Admin.findById(req.admin.id);
      const event = await Event.create({
        title,
        content,
        eventDate,
        eventImage: imageUrl,
        organizedBy,
        venue,
        society: admin.society,
      });

      res.status(200).json({ message: "Event Created Successfully", event });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server error" });
    }
  }
);


//ROUTE 10: Get a admin thorugh id
router.get('/get-admin/:id',fetchAdmin,async (req,res)=>{
  try {
    const adminId = req.params.id;
    const admin = await Admin.findById(adminId).populate('society');
    res.status(200).json({admin}); 
  } catch (error) {
    res.status(500).json({message:"Internal Server error"});
  }
})

//ROUTE 11: Get the number of events
router.get('/get-events',fetchAdmin,async(req,res)=>{
  try {
    const admin = await Admin.findById(req.admin.id).populate('society');
    if(!admin || !admin.society){
      return res.status(400).json({message:"Admin or society not found"});
    }
    const event = await Event.find({society:admin.society}).sort({date:1});
    res.status(200).json({message:"fetched successfully",event});
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Internal Server error"});
  }
})

///ROUTE 12: Get the number of notices publiched;
router.get('/get-notice',fetchAdmin,async(req,res)=>{
  try {
    const admin = await Admin.findById(req.admin.id);
    if(!admin || !admin.society){
      return res.status(400).json({message:"Admin or society not found"});
    }
    const notices = await Notice.find({society:admin.society}).sort({date:1});
    res.status(200).json({message:"fetched successfully",notices});
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Internal Server error"});
  }
})

//ROUTE 13 : GET all the request which is not approvved
router.get('/get-items',fetchAdmin,async(req,res)=>{
  try {
    const adminId = req.admin.id;
    const admin = await Admin.findById(adminId)
    if(!admin) return res.status(400).json({message:"Admin not found"});
    const items = await MarketPlace.find({society:admin.society,approved:false});
    res.status(200).json({message:"Items fetched successfully",items});
  } catch (error) {
    res.status(500).json("Internal Server error");
  }
})

//ROUTE 14 : Update the apprved to be true '/approve/:itemId'
router.post('/approve/:itemId',fetchAdmin,async(req,res)=>{
  try {
    const itemId = req.params.itemId;
    const item = await MarketPlace.findById(itemId);
    item.approved = true;
    item.save();
    res.status(200).json({message:"itema pprove",item});
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Internal server error"})
  }
})

module.exports = router;
