
const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';
const zod = require("zod")

/**
 * Generates a JWT for a given username and password.
 *
 * @param {string} username - The username to be included in the JWT payload.
 *                            Must be a valid email address.
 * @param {string} password - The password to be included in the JWT payload.
 *                            Should meet the defined length requirement (e.g., 6 characters).
 * @returns {string|null} A JWT string if the username and password are valid.
 *                        Returns null if the username is not a valid email or
 *                        the password does not meet the length requirement.
 */
const schemaEmail = zod.string().email()
const schemaPassword = zod.string().min(6) 


function signJwt(username, password) {
    const promiseEmail = schemaEmail.safeParse(username);
    const promisePassword = schemaPassword.safeParse(password);
    if (!promiseEmail.success || !promisePassword.success) {
        return null;
    }else{
        return jwt.sign({ username: username, password: password }, jwtPassword);
    }

}
// signJwt("neeraj@gmail.com", "323h312")

/**
 * Verifies a JWT using a secret key.
 *
 * @param {string} token - The JWT string to verify.
 * @returns {boolean} Returns true if the token is valid and verified using the secret key.
 *                    Returns false if the token is invalid, expired, or not verified
 *                    using the secret key.
 */
function verifyJwt(token) {
    try{
        const decode = jwt.verify(token,jwtPassword)
        console.log(decode);
        return true
    } catch (error){
        console.log("make sure your token and jwtPassword is correct");
        return false
    }

}

/**
 * Decodes a JWT to reveal its payload without verifying its authenticity.
 *
 * @param {string} token - The JWT string to decode.
 * @returns {object|false} The decoded payload of the JWT if the token is a valid JWT format.
 *                         Returns false if the token is not a valid JWT format.
 */
function decodeJwt(token) {
    const decodedPayload = jwt.decode(token)
    if (!decodedPayload) {
        return false
        
    }
    return true
}


module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
}
