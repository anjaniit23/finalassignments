// will have bio,eductaion , experiances ..etc 
const express = require('express');
const router =express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const profile = require('../../models/profile');


router.get('/test',(req,res)=>  res.end("you are in profile page"))

router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    let errors={};
    profile.findOne({user:req.user.id})// why req.user?, why that string if it was already string
           .then(profile=>{
               if(!profile){
                   errors.noprofile = "there is no profile for this user";
                   return res.status(404).json(errors);
               }

               res.json("profile");
           })
           .catch(err=>res.status(404).json("err"));
})
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const profilefields={};
    profilefields.user=req.user.id;
    if(req.body.handle) profilefields.handle=req.body.handle;
    if(req.body.Company) profilefields.Company=req.body.Company;
    if(req.body.Website) profilefields.Website=req.body.Website;
    if(req.body.location) profilefields.location=req.body.location;
    if(req.body.status) profilefields.status=req.body.status;
    if(req.body.skills) profilefields.skills=req.body.skills;


})
module.exports= router;