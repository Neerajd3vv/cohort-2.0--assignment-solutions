
const jwt = require("jsonwebtoken")
const {secret} = require("../config")


// Middleware for handling auth

 async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization
    const words = token.split(" ")
    const myToken = words[1]
    const decode = jwt.verify(myToken ,secret)  
    if (decode.username) {
        req.username = decode.username
        next()
    }else{
        return res.json({msg : "not an admin"})
    }
 

    

}

module.exports = adminMiddleware;

 

