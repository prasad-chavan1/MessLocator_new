const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    item1: {
        type:String,
        required:true,
        trim:true,
        minlength:3
    },
    item2: {
        type:String,
        required:true,
        trim:true,
        minlength:3
    },
    item3: {
        type:String,
        required:true,
        trim:true,
        minlength:3
    },
    item4: {
        type:String,
        required:true,
        trim:true,
        minlength:3
    },
    item5: {
        type:String,
        required:true,
        trim:true,
        minlength:3
    },
    item6: {
        type:String,
        required:true,
        trim:true,
        minlength:3
    },
    messID:{
        type:String,
        required:true
    }

},
    {
        timestamps:true,
    
});

const Menu = mongoose.model('Menu',menuSchema);

module.exports = Menu;