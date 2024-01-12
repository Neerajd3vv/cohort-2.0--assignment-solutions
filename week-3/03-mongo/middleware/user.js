const {user} = require("../db")

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const username = req.headers.username
    const password = req.headers.password
    const exsistigUser = await user.findOne({username: username, password: password})
    if (!exsistigUser) {
       return res.json({msg: 'not an user'})

    }
    return next()
}

module.exports = userMiddleware;