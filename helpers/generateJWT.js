const  jwt = require('jsonwebtoken');
const generateJWT = (user) => { 
    return new Promise((resolve,reject) => {
        const {_id, name, lastName, alias, email, img, role, imgPath} = user;
        const payload = {_id, email, name, lastName, img, alias, role,imgPath};

        jwt.sign(payload, process.env.SECRETPRIVATEKEY,{
            expiresIn:'4h'
        }, (err,token)=>{
            if( err ){
                console.log(err);
                reject('Hubo un error al generar el token')
            }

            resolve(token)
        })
    })
}

module.exports = {
    generateJWT
}