const validator = require('validator');
const isEmpty = require('./isempty');

module.exports =function validateRegisterInput(data){
    let errors ={};
    data.email=!isEmpty(data.email)?data.email:'';
    data.password=!isEmpty(data.password)?data.password:'';


    if(validator.isEmpty(data.email)){
        errors.email= "Email field is Empty"
    }
    if(!validator.isEmail(data.email)){
        errors.email= "Invalid Email"
    }
    if(validator.isEmpty(data.password)){
        errors.password= "Password field is Empty"
    }
    if(!validator.isLength(data.password,{min:6,max:30})){
        errors.password="password must be between 6 and 30 characters";
    }
  
    return{ 
        errors,
        isValid:isEmpty(errors)
    };
}