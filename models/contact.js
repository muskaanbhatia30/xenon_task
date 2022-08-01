const mongoose = require('mongoose');

const ParentSchema = mongoose.Schema({
    personName : 
    {
        type:String,
        required:true,
    },
    email :  {
        type:String,
        required:true,
    },
    msg: {
        type:String,
        required:true,
        unique:true,
    }
});
const contactmodel = mongoose.model("contactmodel",ParentSchema);
module.exports = contactmodel;