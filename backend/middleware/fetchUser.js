var jwt = require('jsonwebtoken');
require('dotenv').config();

const fetchUser = (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        return res.status(400).json({message:"Please authenticate the user first"});
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.users;
        next();
    } catch (error) {
        return res.status(400).json({message:"Please authenticate the user first"})
    }
}

module.exports = fetchUser;