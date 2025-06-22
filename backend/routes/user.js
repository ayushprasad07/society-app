const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { uploadOnCloud } = require('../utils/cloudinary');
const { upload } = require('../middleware/multer.middleware');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');
const Notice = require('../models/Notice');
const Event = require('../models/Event');
const fetchUser = require('../middleware/fetchUser');
const MarketPlace = require('../models/MarketPlace');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

/**
 * ROUTE 1: POST /signUp
 * Register a new user
 */
router.post(
  '/signUp',
  upload.single('userImage'),
  [
    body('name', 'Name must be at least 3 characters').isLength({ min: 3 }),
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });

    try {
      const { name, email, password, gender, society } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: 'Email already registered' });

      if (!req.file) return res.status(400).json({ message: 'Image is required' });

      const localFilePath = req.file.path;
      const uploadedImage = await uploadOnCloud(localFilePath);
      fs.unlinkSync(localFilePath); // remove temp image

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        name,
        email,
        userImage: uploadedImage.secure_url,
        password: hashedPassword,
        gender,
        society,
      });

      const payload = { users: { id: newUser._id.toString() } };
      const authToken = jwt.sign(payload, process.env.JWT_SECRET);

      res.status(200).json({
        message: 'Account created successfully. Awaiting admin approval.',
        user: newUser,
        authToken,
      });
    } catch (error) {
      console.error('Signup Error:', error);
      res.status(500).json({ message: 'Internal Server Error during signup' });
    }
  }
);

/**
 * ROUTE 2: POST /login
 * Authenticate a user
 */
router.post(
  '/login',
  [
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });

    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        console.log('❌ No user found with email:', email);
        return res.status(400).json({ message: 'Invalid email or password.' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        console.log(`❌ Password mismatch for user: ${email}`);
        return res.status(400).json({ message: 'Invalid email or password.' });
      }

      const payload = { users: { id: user._id.toString() } };
      const authToken = jwt.sign(payload, process.env.JWT_SECRET);

      if (!user.isValid) {
        return res.status(200).json({
          message: 'Your account is pending approval by admin.',
          authToken,
        });
      }

      res.status(200).json({
        message: 'Logged in successfully',
        user,
        authToken,
      });
    } catch (error) {
      console.error('Login Error:', error);
      res.status(500).json({ message: 'Internal Server Error during login' });
    }
  }
);


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

//Route 5 : Get the data of teh loggged in user
router.get('/get-user/:id',fetchUser,async(req,res)=>{
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        res.status(200).json({message:"fetched user",user});
    } catch (error) {
        return res.status(500).json({message:"Internal Server error"});
    }
})

//ROUTE 6 : Post a item to sell '/sell-item'
router.post('/sell-item',upload.single('itemImage'),fetchUser,async(req,res)=>{
  try {
    const {title,description,price,venue,phone} = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);

    if(!req.file) return res.status(400).json({message:"Upload the image"});

    const localFilePath = req.file.path;
    const itemImageUpload = await uploadOnCloud(localFilePath);
    fs.unlinkSync(localFilePath);

    const marketPlace = await MarketPlace.create({
      userId: userId,
      type:"sell",
      title,
      itemImage:itemImageUpload.secure_url,
      description,
      price,
      venue,
      phone,
      society: user.society
    });

    res.status(200).json({message:"Request is send for aproval", marketPlace});
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
})

//ROUTER 7 : get all items in tne market place '/get-items'
router.get('/get-items',fetchUser,async(req,res)=>{
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    console.log(user.society);
    const marketPlace = await MarketPlace.find({society:user.society,userId: { $ne: userId },approved:true,isHeld:false});
    console.log(marketPlace);
    res.status(200).json({message:"fetched successfully",marketPlace});
  } catch (error) {
    return res.status(500).json({message:"Internal Server error"});
  }
})

//ROUTE 8 : get the details of the person who has clicked buy button '/buy/:id' TODO
router.get('/buy/:id/:itemId', fetchUser, async (req, res) => {
  try {
    const interestedUserId = req.params.id;
    const itemId = req.params.itemId;

    const interestedUser = await User.findById(interestedUserId);
    const marketPlace = await MarketPlace.findById(itemId);

    if (!interestedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!marketPlace) {
      return res.status(404).json({ message: "Item not found" });
    }

    marketPlace.interestedUsers = { user: interestedUserId };
    marketPlace.isHeld = true;
    marketPlace.inCart = true;
    await marketPlace.save();
    await marketPlace.populate('interestedUsers.user');

    res.status(200).json({ marketPlace });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//ROUTE 9 : Get all the item in the cart.
router.get('/cart', fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;

    const items = await MarketPlace.find({
      'interestedUsers.user': userId,       
      userId: { $ne: userId },              
    })
    .populate('userId') 
    .populate('interestedUsers.user'); 

    res.status(200).json({ message: "Items fetched successfully", items });

  } catch (error) {
    console.error("Error fetching cart items:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// ROUTE 10 : For the user to mark the item as sold
router.get('/sold/:itemId',fetchUser,async(req,res)=>{
  try {
    const itemId = req.params.itemId;
    const item = await MarketPlace.findById(itemId);
    if(!item) return res.status(400).json({message:"item not found"});
    item.isSold = true;
    item.save();
    res.status(200).json({message:"Item Sold",item});
  } catch (error) {
    res.status(500).json({message:"Internal Server error"});
  }
})

//ROUTE 11 : For the user to release teh items form the sold cart section of the selling user
router.get('/release/:itemId',fetchUser,async(req,res)=>{
  try {
    const itemId = req.params.itemId;
    const item = await MarketPlace.findById(itemId);
    if(!item) return res.status(400).json({message:"item not found"});
    item.isSold = false;
    item.save();
    res.status(200).json({message:"Item released",item});
  } catch (error) {
    res.status(500).json({message:"Internal Server error"});
  }
});

// ROUTE 12 : Add a item to the cart
router.get('/add-to-cart/:id/:itemId', fetchUser, async (req, res) => {
  try {
    const interestedUserId = req.params.id;
    const itemId = req.params.itemId;

    const interestedUser = await User.findById(interestedUserId);
    const marketPlace = await MarketPlace.findById(itemId);

    if (!interestedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!marketPlace) {
      return res.status(404).json({ message: "Item not found" });
    }

    marketPlace.interestedUsers.push({ user: interestedUserId });
    marketPlace.inCart = true;
    await marketPlace.save();
    await marketPlace.populate('interestedUsers.user');

    res.status(200).json({message:"Item added to cart", marketPlace });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//ROUTE 13 : GET sell items
router.get('/get-sell',fetchUser,async(req,res)=>{
  try {
    const userId = req.user.id;
    const items = await MarketPlace.find({userId:userId});
    if(!userId) return res.status(400).json({message:"User not found"});
    res.status(200).json({message:"fetched successfully",items});
  } catch (error) {
    res.status(500).json({message:"Internal Server error"});
  }
})


module.exports = router