import User from '../model/User';
import bcrypt from 'bcryptjs';
import express from 'express';
/**bcrypt is the library in js which helps to ecrypt the password.. */ 

export const getAllUsers = async(req,res,next)=>{
    let users;
    try{
        users = await User.find();
    }catch(err){
        console.log(err);
    }

    if(users.length==0){
        return res.status(404).json({message: "No User Found!"});
    }
    return res
    .status(200)
    .json({ users });
}

export const signup = async(req,res,next)=>{
    const{name,email,password} = req.body;
    
    let existingUser;
    try{
        existingUser = await User.findOne({email});

    }catch(err){
        console.log(err);
    }
    if(existingUser){
        return res
        .status(401)
        .json({message: "User already exists"});
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs:[]
    });

    try{
        await user.save();  
    }catch(err){
        console.log(err);
    }
    return res
    .status(200)
    .json({message: user});
}

export const login = async(req,res,next)=>{
    const {email, password} = req.body

    let existingUser;
    try{
        existingUser = await User.findOne({email});
    }catch(err){
        console.log(err);
    }
    if(!existingUser){
        return res
        .status(404)
        .json({message: "Could not find User with this email.."})
    }
    
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if(!isPasswordCorrect){
        return res
        .status(404)
        .json({message: "Wrong Password!"})
    }
    return res
    .status(200)
    .json({message: "Login Successfull", user: existingUser });
}
