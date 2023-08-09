
const mongoose = require('mongoose')
// const yup = require('yup');
const UserSchema = new mongoose.Schema({
    userName: { type: String, required: true,},
    email: { type: String, required: true,unique:true },
    password:{type:String,required:true},
    
}, {
    timestamps: true    
})
//const loginSchema = yup.object().shape({
//     email: yup.string().trim().required(),
//     password: yup.string().trim().required(),
//   });

module.exports = mongoose.model('user', UserSchema)