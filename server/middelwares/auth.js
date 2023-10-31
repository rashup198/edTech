const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

//auth
exports.auth = async (req, res, next) => {
    try {
        //extract token from header
        const token = req.cookies.token || req.body.token

        //if no token found
        if(!token){
            return res.status(401).json({
                success: false,
                message: "No token found"
            })
        }

        //verify token
        try {
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            console.log("decode", decode);
            req.user=decode;

        } catch (error) {
            console.log("error", error);
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wring. Please try again later"
        })
    }
}

