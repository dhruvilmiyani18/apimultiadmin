const admin = require('../../models/admin');
const user = require('../../models/user');

const jwtData = require('jsonwebtoken');



module.exports.addAdmin = async (req, res) => {

    let img = '';
    if (req.file) {
        img = admin.imgPath + '/' + req.file.filename;
    }
    req.body.image = img;

    let data = await admin.create(req.body);
    console.log(data);
}

module.exports.Login = async(req,res)=>{
    // console.log(req.body);

    let checkData = await admin.findOne({email : req.body.email});

    // console.log(checkData);

    if(checkData){
        if(checkData.password == req.body.password){
            
            let token = jwtData.sign({'adminData' : checkData},'RNW',{expiresIn : 86400});

            return res.json({ status : 200 ,token : token ,msg : "Your Token Is Here"})
        }
        else{
            return res.json({status : 400 , msg : "Invalide Password"})
        }
    }
    else{
        return res.json({status : 400 , msg : "Invalide Email"})
    }
}

module.exports.showUserData = async (req,res)=>{

    let userdata = await user.find({});

    return res.json({status : 200, userdata:userdata,msg : "User Data Show Successfully"})
}