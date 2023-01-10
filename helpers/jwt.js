const jwt = require('jsonwebtoken')

let secret= process.env.SUPER_SECRET

module.exports= {
    createToken: (payload) => {
        return jwt.sign(payload, secret)
    },
    decodeToken: (token) => {
        return jwt.verify(token, secret)
    }
}