const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const AvatarPath = '/uploads'

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    todo_id :{
        type : mongoose.Schema.Types.Array,
        ref : 'todoData',
        required : true
    }
})

const userImage = multer.diskStorage({
    destination :(req,file,cb)=>{
        cb(null,path.join(__dirname,'..',AvatarPath));
    },
    filename : (req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now());
    }
});

userSchema.statics.userUploadImg = multer({storage : userImage}).single('image');
userSchema.statics.imagePath = AvatarPath;


const user = mongoose.model('user', userSchema);

module.exports= user;