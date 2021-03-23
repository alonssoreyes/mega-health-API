
const {Schema, model} = require('mongoose');


const EquipmentSchema = new Schema({
    type: {
        type:String,
        required: true,
    },
    assigned_by_id: {
        type:String,
        required: true,
    },
    assigned_by_name: {
        type:String,
        required: true,
    },
    assigned_to_id: {
        type:String,
        required: true,
    },
    assigned_to_name: {
        type:String,
        required: true,
    },
    department: {
        type:String,
        required: true,
    },
    sucursal: {
        type:String,
        required: true,
    },
    category: {
        type:String,
    },
    brand: {
        type:String,
    },
    serial_number: {
        type:String,
    },
    model: {
        type:String,
    },
    location: {
        type:String,
    },
    active: {
        type:Boolean,
        default:true
    },
    conditions: {
        type:String,
    },
    buy_date: {
        type:Date,
    },
    price_buy: {
        type:Number,
    },
    guarantee_date: {
        type:Date,
    },
    description: {
        type:String,
    },
    assigned_date:{
        type:Date
    },
    created_at:{
        type:Date
    },
    imgPath:{
        type:String
    }
});



module.exports = model('Equipment', EquipmentSchema);