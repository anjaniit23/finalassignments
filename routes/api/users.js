//will have name , password,for authentication purposes
const express = require('express');
const router =express.Router();
const User=require('../../models/User');
const gravatar =require('gravatar');
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');
const key=require('../../configure/key');
const passport = require("passport");
const validateRegisterInput=require("../../Validation/register");
const validateLoginInput=require("../../Validation/login");


router.get('/test',(req,res)=>  res.end("you are in user page"));
router.post('/register',(req,res)=>{
    const {errors,isValid}=validateRegisterInput(req.body);
    //check Validation
    if(!isValid){ 
           return res.status(400).json(errors);
    }
    
    User.findOne({email: req.body.email})
        .then( user =>{
            if(user){
                errors.email="Email already exists";
                return res.status(400).json(errors) //for sending status 400-and throwing this written error
            }else{
                const avatar =gravatar.url(req.body.email,{
                    s:'200', //size
                    r:'pg', //rating
                    d:'mm' //default
                });
                const newUser = new User({
                    name:req.body.name,
                    email: req.body.email,
                    password:req.body.password,
                    avatar,
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

router.post('/login',(req,res)=>{
    const emailTyped = req.body.email;
    const passwordTyped=req.body.password;
    const {errors,isValid} =validateLoginInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
        User.findOne({email:emailTyped})
        .then(user=>{
            if(!user){
                errors.email="user not found";
                return res.status(400).json(errors);
            }
            bcrypt.compare(passwordTyped,user.password)
             // for comparing the plain text password and the hashed password
            .then(isMatch=>{
               if(isMatch) {
                   //User matched
                    const payload={id:user.id,name:user.name,avatar:user.avatar};// what we want to include in the token ...is payload

                  //Sign token
                 jwt.sign(payload,key.keysecret,{expiresIn:36000}, (err,token)=>{
                     if(!err){
                        res.json({
                            
                            success:true,
                            token1: "Bearer " + token

                     })// we have to implement passport for verifying the generated tokens
                       
                    }
                })
               }else{
                   errors.password="incorrect password";
                  return  res.status(400).json(errors);
               }
            })
        })

});

router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email
    });
})

module.exports= router;