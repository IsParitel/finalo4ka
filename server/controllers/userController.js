const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Profile_page} = require('../models/models')

const generateJwt = (id, email, telefon, role) => {
    return jwt.sign(
        {id, email, telefon, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role, familia, imya, otchestvo, gorod, sharaga, kurs, birth, telefon} = req.body
        if(!email || !password || !familia || !imya || !otchestvo || !gorod || !sharaga || !kurs || !birth || !telefon) {
            return next (ApiError.badRequest('Не все данные введены'))
        }
        const candidateByEmail = await User.findOne({ where: { email } });
        const candidateByTelefon = await User.findOne({ where: { telefon } });

        if (candidateByEmail || candidateByTelefon) {
            return next(ApiError.badRequest('Пользователь с таким e-mail или номером уже существует'));
        }
        const hashPassword = await bcrypt.hash(password,5)
        const user = await User.create({email, role, familia, imya, otchestvo, gorod, sharaga, kurs, birth, telefon, password: hashPassword})
        const profile_page = await Profile_page.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.telefon, user.role)
        return res.json({token})
    }
    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.badRequest('Такого пользователя не существует'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.badRequest('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.telefon, user.role)
        return res.json({token})
    }
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.telefon, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()