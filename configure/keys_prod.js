require("dotenv").config({path : "../config.env"});
module.exports ={
    mongoURI:"mongodb+srv://anjani:anjani@cluster0.2cyzb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    keysecret:"secret"
};

// module.exports ={
//     mongoURI:process.env.MONGO_URI,
//     keysecret:process.env.SECRET_OR_KEY
// };
