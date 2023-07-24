
const todo = require('../../models/toDo');

const user = require('../../models/user');

module.exports.addToDo = async (req,res)=>{

    let tdata = await todo.create(req.body);

   

    if(tdata){
         let userData = await user.findOne(req.params.id)

       let bm = await userData.todo_id.push(tdata.id);

     let dg =   await user.findByIdAndUpdate(userData.id, {todo_id : userData.todo_id})
     console.log(bm);
     
        return res.json({status : 200,msg : " Add ToDo Successfully"})
    }
    else{
        return res.json({status : 400,msg : " User Not Defind"})
    }
 

    
   
}