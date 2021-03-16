const { response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const validateJWT = async(req,res = response , next) => {
    const token = req.header('x-token');
    if( !token ){
        return res.status(401).json({
            msg :"No hay token en el request"
        })
    }

    try{
        const {_id} = jwt.verify(token, process.env.SECRETPRIVATEKEY);
        const user = await User.findById({_id});

        if(!user){
            return res.status(401).json({
                msg:"Token no valido - Usuario no existe"
            })
        }

        //Check if user has active
        if( !user.status ){
            return res.status(401).json({
                msg:"Token no valido - Usuario inactivo"
            })
        }

        req.user = user;

        next();
    }
    catch(err){
        console.log(err);
        res.status(401).json({
            msg :"Invalid Token"
        })
    }

    

    
}

module.exports = {
    validateJWT
}