const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token){
        return res.status(401).json({
            message: "Not authorized access."
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id);
        if(!user){
            return res.status(401).json({
                message: "Not authorized access."
            })
        }

        //to be able to use user in other routes
        req.userId = user._id.toString();
        next();
    }catch(error){
        console.log(error)
        return res.status(401).json({
            message: "Not authorized access."
        })
    }
}