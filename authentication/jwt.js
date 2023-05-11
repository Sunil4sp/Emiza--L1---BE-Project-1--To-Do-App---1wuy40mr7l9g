const jwt = require("jsonwebtoken");

function token(email, key){
    return jwt.sign({email}, key, {expiresIn: "1h"});
}

module.exports = {
    token,
}