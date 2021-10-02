const mongoose = require('mongoose');
const User =  mongoose.model('User',{ 
        fullname:{
            type:String,
            minLenght:3,
            required:false,
            trim:true
        },
        phoneNumber:{
            type:String, 
            required:true 
        },
        username:{
            type:String,
            required:[true,'Username is required'],
            minLength:5,
            unique:true,
            trim:true
        },
        email:{
            type:String,
            required:false,
            unique:true,
            trim:true
        },
        password:{
            type:String,
            required:[true,'Password is required'],
            minLength:6
        },
        photo : {
             type: String ,
            required : false
         }
})

module.exports = User;