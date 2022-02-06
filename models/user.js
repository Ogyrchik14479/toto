const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/toto')

const User = sequelize.define(
    'User',
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'User',
        },
    },
)

module.exports = User
