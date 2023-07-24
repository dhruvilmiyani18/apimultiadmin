const user = require('../../models/user');

const jwtData = require('jsonwebtoken');

module.exports.addUser = async(req,res)=>{
console.log(req.file);

    let img = '';
    if(req.file){
        img =user.imagePath+'/'+req.file.filename;
    }
    req.body.image = img;

    let data = await user.create(req.body);

    if(data){
        
        return res.json({status : 200,msg : " Add User Successfully"})
    }
    else{
        return res.json({status : 400,msg : " Something Worng"})
    }

}

module.exports.Login = async(req,res)=>{

    let checkEmail = await user.findOne({ email: req.body.email });

    if (checkEmail) {
      if (checkEmail.password == req.body.password) {
  
        let token = jwtData.sign({ 'userData': checkEmail }, 'RNWuser', { expiresIn: 86400 });
  
        return res.json({ status: 200, token: token, msg: "Your Token Is Here" })
      }
      else {
        return res.json({ status: 400, msg: " Invalide Password" })
      }
  
    }
    else {
      return res.json({ status: 400, msg: "Invalide Email" })
    }
}

module.exports.showToDo = async(req,res)=>{
    
    let userData = await user.find({}).populate('todo_id').exec();

    if(userData){
      return res.json({ status: 200, userData: userData, msg: "User Data Show Successfully" })
    }
    else{
      return res.json({status : 400,msg : " Something Worng"})
    }
}