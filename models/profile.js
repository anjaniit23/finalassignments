const mongoose = require('mongoose');
const Schema= mongoose.Schema;
// create schema
const profileSchema = new Schema({
    user: {
        type:Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required:true,
        max:40
    },
    Company: {
        type: String
    },
    Website:{
        type:String,
    },
    location:{
        type:String,
        required:true
    },
    status:{
      type:String,
      required:true
    },
    skills:{
        type:[String],
        required:true
    }
})
module.exports = profile=mongoose.model('profile',profileSchema);