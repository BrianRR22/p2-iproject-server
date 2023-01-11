const { comparePassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
const { Idol, User } = require('../models')


class UserController {
    static async register(req, res, next) {
        try {
            let { username, email, password } = req.body
            let user = await User.create({ username, email, password })
            res.status(201).json({
                message: `User with email ${user.email} has been created with id ${user.id}`,
                id: user.id,
                email: user.email,
                isSubscribed: user.isSubscribed
            })
        } catch (error) {
            next(error)
        }
    }
    static async login(req, res, next) {
        try {
            let { email, password } = req.body
            if (!email) throw { name: 'Email is required' }
            if (!password) throw { name: 'Password is required' }
            let user = await User.findOne({ where: { email } })
            if (!user) {
                throw { name: 'InvalidCredentials' }
            }
            let compared = comparePassword(password, user.password)
            if (!compared) throw { name: 'InvalidCredentials' }

            let payload = {
                id: user.id
            }
            let access_token = createToken(payload)
            res.status(200).json({ access_token, username: user.username })
        } catch (error) {
            next(error)
        }
    }
    static async subscription(req, res, next) {
        try {
            let subs = await User.update({ isSubscribed: true }, { where: { id: req.user.id } })
            res.status(200).json({
                message: `User with id ${req.user.id} now is a subscriber`
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController