const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Profile_page } = require('../models/models');
const path = require('path');
const uuid = require('uuid');

const generateJwt = (id, email, telefon, role) => {
    return jwt.sign(
        { id, email, telefon, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    );
};

class UserController {
    async registration(req, res, next) {
        try {
            const {
                email, password, role, familia, imya, otchestvo,
                gorod, sharaga, kurs, birth, telefon, otraslId, specialId
            } = req.body;

            // Проверка на заполнение всех обязательных полей
            if (
                !email || !password || !familia || !imya || !otchestvo ||
                !gorod || !sharaga || !kurs || !birth || !telefon ||
                !otraslId || !specialId
            ) {
                return next(ApiError.badRequest('Не все данные введены'));
            }

            // Проверка уникальности email и телефона
            const candidateByEmail = await User.findOne({ where: { email } });
            const candidateByTelefon = await User.findOne({ where: { telefon } });

            if (candidateByEmail || candidateByTelefon) {
                return next(ApiError.badRequest('Пользователь с таким e-mail или номером уже существует'));
            }

            // Загрузка аватарки
            let avatarPath = null;
            if (req.files && req.files.avatar) {
                const { avatar } = req.files;

                // Проверка типа изображения
                const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
                if (!validTypes.includes(avatar.mimetype)) {
                    return next(ApiError.badRequest('Неверный формат файла. Только JPG, JPEG и PNG разрешены.'));
                }

                // Сохранение файла
                avatarPath = uuid.v4() + path.extname(avatar.name);
                avatar.mv(path.resolve(__dirname, '..', 'static', avatarPath));
            }

            // Хеширование пароля
            const hashPassword = await bcrypt.hash(password, 5);

            // Создание пользователя
            const user = await User.create({
                email,
                role,
                familia,
                imya,
                otchestvo,
                gorod,
                sharaga,
                kurs,
                birth,
                telefon,
                password: hashPassword,
                avatar: avatarPath,
                otraslId,
                specialId,
            });

            // Создание профиля
            await Profile_page.create({ userId: user.id });

            // Генерация токена
            const token = generateJwt(user.id, user.email, user.telefon, user.role);
            return res.json({ token });
        } catch (error) {
            console.error(error);
            return next(ApiError.internal('Ошибка при регистрации.'));
        }
    }

    async login(req, res, next) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return next(ApiError.badRequest('Такого пользователя не существует'));
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.badRequest('Указан неверный пароль'));
        }
        const token = generateJwt(user.id, user.email, user.telefon, user.role);
        return res.json({ token });
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.telefon, req.user.role);
        return res.json({ token });
    }
}

module.exports = new UserController();
