const validator = require('validator');
const isEmpty = require('./isempty');

module.exports =function validatePostInput(data){
    let errors ={};
    data.name =!isEmpty(data.name)?data.name:'';
    data.text =!isEmpty(data.text)?data.text:'';
// nothins is going to be empty because the avatar  and name will be coming from programmatically
    if(!validator.isLength(data.text,{min:10,max:600})){
        errors.text="Post must be between 10 and 600 characters"
    }
   if(!validator.isLength(data.name,{min:2,max:300})){
       errors.text="name must be between 2 and 300 characters"
   }

    
    return{ 
        errors,
        isValid:isEmpty(errors)
    };
}