const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {
        const authHeader = req.headers.authorization;

        // Проверяем, что заголовок есть и имеет корректный формат
        if (!authHeader) {
            return res.status(401).json({ message: 'Пользователь не авторизован (заголовок отсутствует)' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Пользователь не авторизован (токен отсутствует)' });
        }

        // Проверяем токен
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded; // Добавляем данные пользователя в `req`
        next(); // Передаём управление дальше
    } catch (error) {
        console.error('Ошибка авторизации:', error.message); // Логирование
        res.status(401).json({ message: 'Пользователь не авторизован' });
    }
};
