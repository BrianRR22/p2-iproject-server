const { Op } = require('sequelize')
const { comparePassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
const { Idol, User, Favorite, Branch } = require('../models')


class UserController {
    static async register(req, res, next) {
        try {
            let { username, email, password } = req.body
            let customer = await User.create({ username, email, password })
            res.status(201).json({
                message: `Customer with email ${customer.email} has been created with id ${customer.id}`,
                id: customer.id,
                email: customer.email
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
    static async addFavoriteIdol(req, res, next) {
        try {
            let IdolId = req.params.IdolId
            let findIdol = await Idol.findOne({
                where: { id: IdolId }
            })
            if (!findIdol) {
                throw { name: 'Data Not Found' }
            }
            let UserId = req.user.id
            let data = await Favorite.create({ IdolId, UserId })
            res.status(201).json({
                message: "Success Add Favorite Idol",
                idol: data
            })
        } catch (error) {
            next(error)
        }
    }
    static async favoriteIdolList(req, res, next) {
        const { filter } = req.query;
        let UserId = req.user.id
        const paramQuerySQL = {
            include: [
                {
                    model: Branch,
                    attributes:{
                        exclude: ['createdAt', 'updatedAt']
                    }
                },
                {
                    model: Favorite,
                    where: { UserId },
                    attributes:{
                        exclude: ['createdAt', 'updatedAt']
                    },
                    right: true
                },
            ],
            attributes:{
                exclude: ['createdAt', 'updatedAt']
            },
            order: [['id', 'asc']]};

        // filtering by category
        if (filter !== '' && typeof filter !== 'undefined') {
            const query = filter.branch.split(',').map((item) => ({
                [Op.eq]: item,
            }));

            paramQuerySQL.where = {
                BranchId: { [Op.or]: query },
            };
        }
        try {
            let data = await Idol.findAll(paramQuerySQL)
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController