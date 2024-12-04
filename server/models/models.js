const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
    familia: { type: DataTypes.STRING },
    imya: { type: DataTypes.STRING },
    otchestvo: { type: DataTypes.STRING },
    //image: { type: DataTypes.STRING },
    gorod: { type: DataTypes.STRING },
    sharaga: { type: DataTypes.STRING },
    kurs: { type: DataTypes.INTEGER },
    birth: { type: DataTypes.DATE },
    telefon: { type: DataTypes.STRING, unique: true },
});

const Profile_page = sequelize.define('profile_page', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Job_reg = sequelize.define('job_reg', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Job_page = sequelize.define('job_page', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
});

const Otrasl = sequelize.define('otrasl', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Special = sequelize.define('special', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

// Новая таблица job_create
const Job_create = sequelize.define('job_create', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    job_pageId: { type: DataTypes.INTEGER, allowNull: false },
    profile_pageId: { type: DataTypes.INTEGER, allowNull: false },
});

// Настройка связей
User.hasOne(Profile_page);
Profile_page.belongsTo(User);

Profile_page.hasMany(Job_reg, { foreignKey: 'profile_pageId' });
Job_reg.belongsTo(Profile_page, { foreignKey: 'profile_pageId' });

Otrasl.hasMany(Job_page);
Job_page.belongsTo(Otrasl);

Special.hasMany(Job_page);
Job_page.belongsTo(Special);

Job_page.hasMany(Job_reg, { foreignKey: 'job_pageId' });
Job_reg.belongsTo(Job_page, { foreignKey: 'job_pageId' });

Otrasl.hasMany(Special);
Special.belongsTo(Otrasl);

// Связи для job_create
Profile_page.hasMany(Job_create, { foreignKey: 'profile_pageId' });
Job_create.belongsTo(Profile_page, { foreignKey: 'profile_pageId' });

Job_page.hasMany(Job_create, { foreignKey: 'job_pageId' });
Job_create.belongsTo(Job_page, { foreignKey: 'job_pageId' });

module.exports = {
    User,
    Profile_page,
    Job_reg,
    Job_page,
    Otrasl,
    Special,
    Job_create, // Экспорт новой таблицы
};
