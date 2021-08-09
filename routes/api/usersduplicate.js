//will have name , password,for authentication purposes
const express = require('express');
const router =express.Router();
const User=require('../../models/User');
const gravatar =require('gravatar');
const bcrypt =require('bcryptjs');

router.get('/test',(req,res)=>  res.end("you are in user page"));
router.post('/register',(req,res)=>{
    const email=req.body;
    User.findOne({email: req.body.email})
        .then( user =>{
            if(user){
                return res.status(400).json({email: 'Email already exists'}) //for sending status 400-and throwing this written error
            }else{
                const avatar =gravatar.url(req.body.email,{
                    s:'200', //size
                    r:'pg', //rating
                    d:'mm' //default
                });
                const newUser = new User({
                    name:req.body.name,
                    email: req.body.email,
                    avatar,
                    password:req.body.password
                });

                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(newUser.password,salt,(err,hash)=>{                               //we hash the password with salt
                        if(err) throw err;
                        newUser.password=hash;                                                   //then we set the password to the hash
                        newUser.save()                                                             //we will save the user and respond to it
                        .then(user=>{res.json(user)})
                        .catch(err =>console.log(err));
                    })
                })
            }
        }

        )
});

module.exports= router;