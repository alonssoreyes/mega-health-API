

const User = require('../models/user');
const bcrypt = require('bcrypt');

const getUsers = async (req, res) => {

    try {
        const users = await User.find({});
        res.json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }



}

const saveUser = async(req,res) => {
    const {name,lastName,email,password,alias} = req.body;
    const user = new User(req.body);
    
    

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
        res.status(200).json({
            name: user.name,
            lastName: user.lastName,
            alias:user.alias,
            role:user.role,
            status:user.status
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

            res.status(200).json(deleteUser)

        }
    } catch (error) {
        res.status(500).json(error)

    }


}


module.exports = {
    getUsers,
    saveUser,
    deleteUser
}