const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {Users} = require('../models/user')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        try {
            const {email, password, role} = req.body
            console.log(role)
            if (!email || !password) {
                return next(ApiError.badRequest('Некорректный email или password'))
            }

            const candidate = await Users.findOne({
                where: {email}
            });
            console.log(candidate);
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await Users.create({email, role, password: hashPassword})
            const token = generateJwt(user.id, user.email, user.role)
            return res.json({token})
        }catch (e){
            console.log(e)
        }

    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const user = await Users.findOne({where: {email}})
            if (!user) {
                return next(ApiError.internal('Пользователь не найден'))
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return next(ApiError.internal('Указан неверный пароль'))
            }
            const token = generateJwt(user.id, user.email, user.role)
            return res.json({token})
        } catch (e){
            console.log(e);
        }

    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()