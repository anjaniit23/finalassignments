const express =require('express');
const mongoose =require("mongoose");


const users=require('./routes/api/users'); // for connceting to the file
const profile=require('./routes/api/profile');
const post=require('./routes/api/post');


const app=express();

//DB config
const db=require('./configure/key').mongoURI;

//conncet to mongoDB
mongoose.connect(db)
        .then(()=>{console.log("connected MongoDB")})
        .catch(err => console.log("error"));


app.get('/',(req,res)=>res.end("hello World")); //when we get request of '/' ,then that callback function is executed..which responds by saying hello


//use routes
app.use('/api/users',users);   //if we have /api/users then we have to get that users variable...
app.use('/api/profile',profile);
app.use('/api/post',post);


const port=process.env.PORT || 5000; //we need to have a port for hosting our application on the server that first term is for deploying in Hokaru
app.listen(port,()=>console.log(`server running on port ${port}`));