const jwt = require('jsonwebtoken')
require('dotenv').config();
const secretKey = (process.env.secretKey || 'secretkeyfortoken')

function tokenVerification(req, res, next) {
    try {
        const token = req.header("auth-token")

        if (!token) {
            res.status(400).json({
                "sucess": false,
                "message": "token NOT available",//json formatting
            })
        }
        else {
            const data = jwt.verify(token, secretKey)
            next()
        }
    }
    catch (e) {
        res.status(400).json({
            "sucess": false,
            "message": "token not verfied",

        })
        console.log(e)
    }
}
module.exports = { tokenVerification }