const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:3
    },
    name: {
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:3
    },
    password: {
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:3
    },
    email: {
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:3
    },
    phone:{
        type:Number,
        trim:true,
        minlength:10
    },
    clgName:{
        type:String,
        trim:true,
        minlength:3
    }

},
    {
        timestamps:true,
    
});

const User = mongoose.model('Users',userSchema);

module.exports = User;