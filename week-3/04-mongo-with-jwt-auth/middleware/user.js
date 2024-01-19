
const jwt = require("jsonwebtoken")
const {secret} = require("../config")

 async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization
    const words = token.split(" ")
    const myToken = words[1]
    const decode = jwt.verify(myToken ,secret)  
    if (decode.username) {
        req.username = decode.username
        next()
    }else{
        return res.json({msg : "not an user"})
    }
 

}

module.exports = userMiddleware;