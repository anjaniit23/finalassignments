require("dotenv").config({path : "../config.env"});

module.exports ={
    mongoURI:process.env.MONGO_URI,
    keysecret:process.env.SECRET_OR_KEY
};

