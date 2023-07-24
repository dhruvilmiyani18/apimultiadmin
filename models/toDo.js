const mongoose = require('mongoose');



const ToDoSchema = mongoose.Schema({
    task : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    },
    type : {
        type : String,
        required : true
    },
    user_id :{
        type : String,
        required : true
    }
})




const todoData = mongoose.model('todoData', ToDoSchema);

module.exports= todoData;