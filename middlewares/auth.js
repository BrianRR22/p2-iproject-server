const { Idol, User, } = require('../models')
const { decodeToken } = require('../helpers/jwt')

async function authentication(req, res, next) {
    try {
        let access_token = req.headers.access_token
        if (!access_token) {
            throw { name: 'Unauthenticated' }
        }
        let payload = decodeToken(access_token)
        let user = await User.findByPk(payload.id)
        if (!user) {
            throw { name: 'Unauthenticated' }
        }
        req.user = { id: user.id, email: user.email }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = { authentication }