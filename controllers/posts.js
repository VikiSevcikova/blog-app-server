const Post = require("../models/Post");

exports.getAllPosts = async (req, res, next) => {
    try{
        const posts = await Post.find({ user_id: req.userId});
        if(!posts){
            return res.status(404).json({posts: [], message: "No posts."});
        }
        res.status(200).json({posts});
    }catch(error){
        return res.status(500).json({message: "There is an issue."});
    }
}

exports.addNewPost = async (req, res, next) => {
    try{
        const { post } = req.body;
        const newPost = await Post.create({...post, user_id: req.userId});

        res.status(200).json({post: newPost, message: "Post successfully added."});
    }catch(error){
        return res.status(500).json({message: "There is an issue."});
    }
}

exports.deletePost = async (req, res, next) => {
    try{
        const post = await Post.findByIdAndRemove(req.params.id);

        res.status(200).json({id: post._id, message: "Post was deleted."});
    }catch(error){
        return res.status(500).json({message: "There is an issue."});
    }
}

exports.updatePost = async (req, res, next) => {
    try{
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).send({message: "Post not found."});
        if (post.user_id !== req.userId) return res.status(401).send({message: "Post update failed. Not authorized."});

        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json({post: updatedPost, message: "Post was successfully updated."});
    }catch(error){
        return res.status(500).json({message: "There is an issue."});
    }
}