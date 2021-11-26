const User = require("../models/User");

exports.currentUser = async (req, res, next) => {
    console.log("currentUser", req.userId);
    try{
        const user = await User.findById(req.userId);
        if(!user){
            return res.status(401).json({message: "Unauthorized access, please login."});
        }
        res.status(200).json({user});
    }catch(error){
        return res.status(500).json({message: "There is an issue."});
    }
}