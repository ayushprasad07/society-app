const express = require('express');
const router = express.Router();
const Society = require('../models/Society')
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

//ROUTE 1 : Fetch all the society which are there in the databsase
router.get('/get-societies', async(req,res)=>{
    try {
        const societies = await Society.find();
        if (societies.length === 0) {
            return res.status(404).json({ message: "No societies found" });
        }
        res.status(200).json({message:"Socities fetched successfully",societies});
    } catch (error) {
        return res.status(500).json({message:"Internal Server error"});
    }
})

module.exports = router;