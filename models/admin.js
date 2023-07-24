const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const AvtarPath = '/uploads'

const adminSchema = mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true
    },
    password :{
        type : String,
        required : true
    },
    image :{
        type : String,
        required : true
    }
})

const adminImage = multer.diskStorage({
    destination :(req,file,cb)=>{
        cb(null,path.join(__dirname,'..',AvtarPath));
    },
    filename: (req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now());
    }
    
});

adminSchema.statics.adminUploadImg = multer({storage :adminImage }).single('image');
adminSchema.statics.imgPath = AvtarPath;


const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;