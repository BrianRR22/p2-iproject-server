const { comparePassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
const { Idol, User } = require('../models')


class UserController{
    static async login(req, res, next){
        try {
            let {email, password}= req.body
            if(!email)throw{name: 'Email is required'}
            if(!password)throw{name: 'Password is required'}
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
}

module.exports= UserController