const { response } = require("express");
const User = require("../models/user");
const bcrypt = require('bcrypt');
const { generateJWT } = require("../helpers/generateJWT");
const login = async (req,res = response) => { 

    const {email, password} = req.body

    try{

        //Check if email exists

        const user = await User.findOne({email});

        if(!user ){
            return res.status(400).json({
                msg: "Email o contraseña no son correctos"
            })
        }

        //Check if user is active
        if(!user.status ){
            return res.status(400).json({
                msg: "Usuario sin acceso, debido a inactividad"
            })
        }

        //Check password
        const validPassword = bcrypt.compareSync(password, user.password);

        if( !validPassword ){
            return res.status(400).json({
                msg: "Contraseña incorrecta"
            })
        }

        //Generate JWT
        const token = await generateJWT(user);

        res.json({
            user,
            token
        })


    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg:"Algo salio mal"
        })
    }
}
module.exports = {
    login
}