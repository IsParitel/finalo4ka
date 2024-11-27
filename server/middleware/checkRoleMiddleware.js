const jwt = require('jsonwebtoken');

module.exports = function (...allowedRoles) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            return next();
        }
        try {
            const authHeader = req.headers.authorization;

            // Проверяем, что заголовок существует и корректен
            if (!authHeader) {
                return res.status(401).json({ message: 'Пользователь не авторизован (заголовок отсутствует)' });
            }

            const token = authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Пользователь не авторизован (токен отсутствует)' });
            }

            // Проверяем токен
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            // Проверяем, есть ли у пользователя одна из допустимых ролей
            if (!allowedRoles.includes(decoded.role)) {
                return res.status(403).json({ message: 'Нет доступа для вашей роли' });
            }

            req.user = decoded; // Добавляем данные пользователя в `req`
            next(); // Передаём управление дальше
        } catch (error) {
            console.error('Ошибка проверки роли:', error.message); // Логирование
            res.status(401).json({ message: 'Пользователь не авторизован' });
        }
    };
};
