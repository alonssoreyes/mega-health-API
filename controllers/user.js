

const User = require('../models/user');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const getUsers = async (req, res) => {

    try {
        const users = await User.find({});
        res.json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }



}

const updateUser = async (req,res)=> {
    const id = req.params.id;
    const data = req.body;
    try{
        const updated = await User.findByIdAndUpdate(id,data);

        if(updated) res.json(updated);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const getUserName = async(req,res) => {
    const id = req.params.id; 
    try{
        const user = await User.findById(id);
        res.json({
            name:user.name,
            lastName:user.lastName
        });
    }
    catch(err){
        res.status(500).json(err);
    }
}

const saveUser = async(req,res) => {
    let imageName;
    const user = new User(req.body);
    if(req.file){
         imageName = req.file.filename;
         //Set image
        user.img = imageName;
        user.imgPath = '/img/uploads/' + imageName;
    }

    const {email,password} = req.body;
    
    
    

    //Check if mail exists
    const emailExists = await User.find({email});
    if(emailExists.length > 0 ){
        return res.status(400).json({
            message:'El Email ya esta registrado'
        })
    }

    //Encrypt
    const salt = bcrypt.genSaltSync();
    user.password  = bcrypt.hashSync(password, salt)


    
    //save
    try{
        await user.save();

        res.status(201).json({
            user
        })

    }
    catch (err) {
        res.status(500).json({
            err
        })
    }


}

const deleteUser = async (req, res) => {

    const id = req.params.id;
    try {
        const deleteUser = await User.findByIdAndUpdate(id,{status:false})
        if (deleteUser) {

            return res.status(200).json(deleteUser)

        }
    } catch (error) {
        return res.status(500).json(error)

    }


}


module.exports = {
    getUsers,
    getUserName,
    saveUser,
    deleteUser,
    updateUser
}