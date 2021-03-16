
const {Schema, model} = require('mongoose');


const UserSchema = new Schema({
    name: {
        type:String,
        required: true,
    },
    lastName: {
        type:String,
        required: true,
    },
    alias: {
        type:String,
        required: true,
    },
    email: {
        type:String,
        required: true,
        unique:true
    },
    password: {
        type:String,
        required: true,
    },
    img: {
        type:String,
    },
    role: {
        type:String,
        required:true,
        emun:['ADMIN_ROLE', 'EMPLOYEE_ROLE']
    },
    status: {
        type:Boolean,
        default:true,
    },
});

UserSchema.methods.toJSON = function(){
    const {__v, password, _id, ...user} = this.toObject();
    user.uid= _id;

    return user;
}

module.exports = model('User', UserSchema);