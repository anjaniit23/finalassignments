
 require("dotenv").config({path: './config.env'});

const express =require('express');
const mongoose =require("mongoose");
const passport= require("passport");
const bodyParser = require('body-parser');// for reading req.body
const path=require('path');
const users=require('./routes/api/users'); // for connceting to the file
const profile=require('./routes/api/profile');
const post=require('./routes/api/post');
const process=require('process');
const cors = require('cors');

const app=express();
//body parser middleware

app.use(express.urlencoded({extended:true}));
app.use(express.json());
// app.use(cors({
//         origin:'http://localhost:5000',
//         credentials:true,
// }));
// DB config
const db=require('./configure/key').mongoURI;
console.log(db);
//conncet to mongoDB
mongoose.connect(db,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true})
        .then(()=>{console.log("connected MongoDB")})
        .catch(err => console.log(err));
// passport middleware        
app.use(passport.initialize());
//passport config
require('./configure/passport')(passport);



app.use('/api/users',users);   //if we have /api/users then we have to get that users variable...
app.use('/api/profile',profile);
app.use('/api/posts',post);

//serve static assets if in production

 //set static folder
if(process.env.NODE_ENV==="production"){
app.use(express.static(path.join(__dirname,'/my-app','build')));

app.get('*',(req,res)=>{
                res.sendFile(path.join(__dirname, 'my-app','build','index.html'));
 });
}else{
        app.get('/',(req,res)=>{
                res.send("Api working");
        })
}
const port=process.env.PORT; 
console.log(process.env.NODE_ENV);
app.listen(port,()=>console.log(`server running on port ${port}`));