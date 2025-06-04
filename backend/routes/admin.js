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
    const admin = await Admin.findOne({ email });
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
    await Admin.findByIdAndUpdate(req.admin._id,{society: society._id});
    // const populatedAdmin = await Society.findById(society._id).populate('adminId');
    res.status(200).json({message:"Society created Successfully",society})
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
})


module.exports = router;
