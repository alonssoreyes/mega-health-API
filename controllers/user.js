

const User = require('../models/user');

const getUsers = async(req,res) => { 
    
    try{
        const users = await User.find({});
        res.json(users);
    }
    catch(err){
        res.status(500).json(err);
    }

    
    
}

const saveUser = async(req,res) => { 
    const user = new User(req.body);

    try{
        await user.save();
        res.json({user})
    }
    catch(err){
        res.status(500).json({
            err
        })
    }

    
}


module.exports={
    getUsers,
    saveUser
}