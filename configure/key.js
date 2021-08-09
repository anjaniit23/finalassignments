require("dotenv").config({path : "../config.env"});

if(process.env.NODE_ENV==='production'){
    module.exports = require('./keys_prod');

}else{
    module.exports = require('./keys_dev');

}
console.log(process.env.NODE_ENV);