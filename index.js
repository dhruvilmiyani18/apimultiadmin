const express = require('express');
const port = 8030;
const app = express();

// const db = require('./config/mongoose');
const jwtPassport = require('./config/jwtPassport');
const passport = require('passport');
const session = require('express-session');

const mongoose = require('mongoose')

const url = `mongodb+srv://dhruvil:henimiyani1234@cluster0.udkaapr.mongodb.net/ToDoAPI?retryWrites=true`;

mongoose.connect(url,{
  useNewUrlParser: true,
  useUnifiedTopology: true 
})
  
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

app.use(express.urlencoded());


app.use(session({
    name : 'todo',
    secret : "todolist",
    saveUninitialized : false,
    resave : true,
    cookie :{
        maxAge :80*100*100
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/',require('./routes/V1/index'));

app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    console.log("server runing on port : "+port);
})