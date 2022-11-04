import Blog from '../model/Blog';
import User from '../model/User';
import mongoose from 'mongoose';

export const getAllBlogs = async(req,res,next)=>{
    let Blogs;
    try{
        Blogs = await Blog.find().populate("user");
    }catch(err){
        console.log(err);
    }
    if(!Blog){
        return res
        .status(404)
        .json({message:"Blog not Found.."})
    }
    return res
    .status(200)
    .json({Blogs})
};

export const addBlogs = async(req,res,next)=>{
    const{title, description,user, image} = req.body;
    let existingUser;
    try{
        existingUser = await User.findById(user);
    }catch(err){
        console.log(err);
    }
    if(!existingUser){
        return res
        .status(400)
        .json({message:"Not Found User With this userId.."})
    }

    const blog = new Blog({
        title, 
        description,
        image, 
        user
    });
    try{
        const session = await mongoose.startSession();
        session.startTransaction;
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session});
        await session.commitTransaction();
    }catch(err){
        console.log(err);
    }

    return res
    .status(200)
    .json({blog})
};

export const updateBlogs = async(req,res,next)=>{
    const{title, description} = req.body;

    const blogId = req.params.id;

    let blogs;
    try{
        blogs = await Blog.findByIdAndUpdate(blogId,{
            title,
            description
        })
    }catch(err){
        console.log(err);
    }
    if(!blogs){
        return res
        .status(500)
        .json({message: "Unable to update"})
    }

    return res
    .status(200)
    .json({message:"Updated Successfully!"})
};

export const getById = async(req,res,next)=>{
    const id = req.params.id;
    let blog;
    try{
        blog = await Blog.findById(id);
    }catch(err){
        console.log(err);
    }
    if(!blog){
        return res
        .status(404)
        .json({message:"Blog Not Found!"})
    }
    return res
    .status(200)
    .json({blog})
};

export const deleteBlog = async(req,res,next)=>{
    const id = req.params.id;
    let blog;
    try{
        blog = await Blog.findByIdAndDelete(id).populate('user');
        //populates lets you reference documents in other collections.
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    }catch(err){
        console.log(err);
    }
    if(!blog){
        return res
        .status(404)
        .json({message:"Blog Not Found!"})
    }
    return res
    .status(200)
    .json({meassge: "Blog Deleted!"})
};

export const getBlogByUserId = async(req,res,next)=>{
    const userId = req.params.id;
    let userBlogs;
    try{
        userBlogs = await User.findById(userId).populate("blogs");
    }catch(err){
        console.log(err);
    }
    if(!userBlogs){
        return res
        .status(404)
        .json({message:"No blogs found!"})
    }return res
    .status(200)
    .json({blogs:userBlogs})
}