const Joi = require('joi');
const User = require('../models/User');

exports.register = async (req, res, next) => {
    console.log('register');
    try{
        const schema = Joi.object({ username: Joi.string().required(), email: Joi.string().email().required(), password: Joi.string().min(6).required() });
        const { error } = schema.validate(req.body);
        if (error)  {
            return res.status(400).json({
                message: error.details[0].message
            })
        }
        const user = await User.create(req.body);
        console.log(user)
        sendToken(user, 201, res, "Successfully registered.");
    }catch (error){
        console.log(error.message)
        return res.status(500).json({
            message: error.message
        })
    }
}

exports.login = async (req, res, next) => {
    console.log("login");
    try{
        const schema = Joi.object({ email: Joi.string().email().required(), password: Joi.string().required() });
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            })
        }

        const {email, password} = req.body;
        //select("+password") means that we want also to return the password, because is schema we set select to false
        const user = await User.findOne({ email }).select("+password");
        if(!user){
            return res.status(401).json({
                message: "Invalid credentials."
            })
        }
        const isMatched = await user.matchPasswords(password);
        if(!isMatched){
            return res.status(401).json({
                message: "Invalid credentials."
            })
        }

        sendToken(user, 200, res, "Welcome back!");

    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}

const sendToken = (user, statusCode, res, message) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({user: user, accessToken : token, message});
}