const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messSchema = new Schema({
    messName: {
        type:String,
        required:true,
        trim:true,
        minlength:3
    },
    password: {
        type:String,
        required:true,
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
    },
    location:{
        type:Object,
        trim:true,
        minlength:3
    },
    ownerName:{
        type:String,
        trim:true,
        minlength:3
    },
    halfTime:{
        type:String,
        trim:true,
    },
    fullTime:{
        type:String,
        trim:true,
    },
    url:{
        type:String,
        trim:true,
        minlength:3
    },
    menu:[{
        text:String
    }]

},
    {
        timestamps:true,
    
});

const Mess = mongoose.model('Messes',messSchema);

module.exports = Mess;