const { Op } = require('sequelize')
const { comparePassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
const { Idol, User, Favorite, Branch } = require('../models')
const { OAuth2Client } = require('google-auth-library');
const midtransClient = require('midtrans-client');
const nodemailer= require('nodemailer')


class UserController {
    static async register(req, res, next) {
        try {
            let { username, email, password } = req.body

            let transporter = nodemailer.createTransport({
                service:'gmail',
                auth: {
                  user: process.env.EMAIL,
                  pass: process.env.PASS
                },
                tls: {
                    rejectUnauthorized: false
                }
              });

            const sendEmail= (emailSend) => {
                const option= {
                    from: "AKUNRESMI",
                    to: emailSend,
                    subject: "Someone Login",
                    text: `Dear ${username},

                    We are pleased to inform you that your account for HLLV Production has been created. By logging in you can now access our services such as:
                    
                    - Add favorite idol
                    - Become a member (if not subscribed)
                    
                    Please keep this email for your records, as you will need your login information to access your account in the future. If you have any issues logging in, please contact us at HLLV-Production/contact.
                    
                    Thank you for choosing HLLV Production for your needs.
                    
                    Best regards,
                    HLLV Production`
                }

                transporter.sendMail(option, (err, info) => {
                    if(err) return console.log(err);
                    console.log(`Emails: Send to ${emailSend}`);
                })
            }
            
            sendEmail(email)
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

            let transporter = nodemailer.createTransport({
                service:'gmail',
                auth: {
                  user: process.env.EMAIL,
                  pass: process.env.PASS
                },
                tls: {
                    rejectUnauthorized: false
                }
              });

            const sendEmail= (emailSend) => {
                const option= {
                    from: "AKUNRESMI",
                    to: emailSend,
                    subject: "Someone Login",
                    text: `Dear ${emailSend},

                    We are pleased to inform you that your account for HLLV Production has been login. You can now access our services such as:
                    
                    - Add favorite idol
                    - Become a member (if not subscribed)
                    
                    Please keep this email for your records, as you will need your login information to access your account in the future. If you have any issues logging in, please contact us at HLLV-Production/contact.
                    
                    Thank you for choosing HLLV Production for your needs.
                    
                    Best regards,
                    HLLV Production`
                }

                transporter.sendMail(option, (err, info) => {
                    if(err) return console.log(err);
                    console.log(`Emails: Send to ${emailSend}`);
                })
            }
            
            sendEmail(email)

            let payload = {
                id: user.id
            }
            let access_token = createToken(payload)
            res.status(200).json({ access_token, username: user.username,  isSubscribed: user.isSubscribed })
        } catch (error) {
            next(error)
        }
    }
    static async loginWithGoogle(req, res, next) {
        try {
            const googleAuthToken = req.headers.google_auth_token

            const CLIENT_ID = process.env.CLIENT_ID
            const client = new OAuth2Client(CLIENT_ID);

            const ticket = await client.verifyIdToken({
                idToken: googleAuthToken,
                audience: CLIENT_ID,
            });
            const { name, email } = ticket.getPayload();
            const [user, created] = await User.findOrCreate({
                where: { email },
                defaults: {
                    username: name,
                    email,
                    password: 'thisispassword',
                    isSubscribed: false
                },
                hooks: false
            })
            let access_token = createToken({ id: user.id })
            res.status(200).json({ access_token, username: user.username, isSubscribed: user.isSubscribed })
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
    static async generateMidtransToken(req, res, next) {
        try {
            const findUser= await User.findByPk(req.user.id)
            if(findUser.isSubscribed === true) throw {name: 'already_subscribed'}
            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction : false,
                serverKey : process.env.MIDTRANS_SERVER_KEY
            });
            let parameter = {
                "transaction_details": {
                    "order_id": "TRANSACTION_" + Math.floor(1000000 + Math.random() * 9000000),
                    "gross_amount": 200000
                },
                "credit_card":{
                    "secure" : true
                },
                "customer_details": {
                    "email": findUser.email,
                }
            };
            const midtransToken= await snap.createTransaction(parameter)
            res.status(201).json(midtransToken)
        } catch (error) {
            next(error)
        }
    }
    static async findUser(req, res, next) {
        try {
            let data = await User.findOne({
                attributes: {
                    exclude: ['password']
                },
                where: {
                    id: req.user.id
                }
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async deleteFavoriteIdol(req, res, next) {
        try {
            let id = req.params.id
            let findFavorite = await Favorite.findOne({
                where: { id }
            })
            if (!findFavorite) {
                throw { name: 'Data Not Found' }
            }
            let data = await Favorite.destroy({ where: {id} })
            res.status(200).json({
                message: "Success Delete Favorite Idol"
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController