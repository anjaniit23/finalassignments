// for post ,comments
const mongoose = require('mongoose');
const passport= require('passport');

const profile= require('../../models/profile');
const post=require('../../models/post');
//validation
const validatePostInput=require('../../Validation/post');

const express = require('express');
const router =express.Router();
router.get('/test',(req,res)=>  res.end("you are in post page"));


//for showing all the posts available
router.get('/',(req,res)=>{
    post.find()
       .sort({date:-1})
       .then(posts=>res.json(posts))
       .catch(err=>res.status(404).json({nopostsfound:"no posts found"}))
})
//for showing  a single post

router.get('/:id',(req,res)=>{
    post.findById(req.params.id)
       .then(post=>res.json(post))
       .catch(err=>res.status(404).json({nopostfound:"no  such post found"}))
})
//for deleting the post -private
router.delete('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
 profile.findOne({user:req.user.id})
        .then(profile=>{
            post.findById(req.params.id)
                .then(post=>{
                    //check for the owner
                    if(post.user.toString() !== req.user.id){      
                        return res.status(401).json({
                            notauthorized:"User not authorized"
                        });                    //req.user.id is a string but post.user is not ..so we used the other method}
                        }
                    //delete
                    post.remove().then(()=>{ res.json({success:true})})
                         .catch(err=>res.status(404).json({postnotfound:"No post found"}));
            })
})});
//post req for like

router.post('/like/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    profile.findOne({user:req.user.id})
           .then(profile=>{
               post.findById(req.params.id)
                   .then(post=>{
                       if(post.likes.filter(like=>like.user.toString()===req.user.id).length>0){
                            const removeindex=post.likes.map(item=>item.user.toString()).indexOf(req.user.id);
                            //remove it
                            post.likes.splice(removeindex,1);
                            //save it
                            post.save().then(post=>res.json(post));

                       }
                       else{
                            //else add user to like array
                            post.likes.unshift({user:req.user.id});
                            //save it
                            post.save().then(post=>res.json(post));
                       }
                   })
                    .catch(err=>res.status(404).json({postnotfound:"No post found"}));
               })
   });

// route for creating apost

router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{  
    const {errors,isValid}= validatePostInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
      const newPost = new post({
             text:req.body.text,
             name:req.body.name,  //redux keeps the user information in the state, throughout the entire application as long as they are logged in and we have to access to it whenever we want
             avatar:req.body.avatar,
             user:req.user.id
      });

      newPost.save().then(post=> res.json(post));

})

module.exports= router;