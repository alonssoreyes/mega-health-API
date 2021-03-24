const {Schema, model} = require('mongoose');


const SucursalSchema = Schema({
    name: {
        type:String
    },
    correo:{
        type:String,
        unique:true
    },
    city:{
        type:String,
    },
    direction:{
        type:String,
    },
    phone:{
        type:String
    },
    imgPath:{
        type:String
    }
});

module.exports = model('Sucursal', SucursalSchema);