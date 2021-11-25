require("dotenv").config({ path: "../config.env" });

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./keys_prod');

} else {
    module.exports = {
        mongoURI: process.env.MONGO_URI,
        keysecret: process.env.SECRET_OR_KEY
    };
}
