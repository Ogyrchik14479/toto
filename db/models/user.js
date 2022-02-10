const { Sequelize, DataTypes } = require('sequelize')
const sequelizeConnections = require('../db.connection')

const User = sequelizeConnections.define(
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
            type: DataTypes.ENUM,
            values: ['User', 'Admin'],
            defaultValue: 'User',
        },
    }, {
        tableName: 'users',
        timestamps: false, //отключетает генерацию временных меток createdAt и updatedAt
    }
)

module.exports = User
