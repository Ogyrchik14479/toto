const config = require('../config');
const jwt = require('jsonwebtoken');
const users = require("../db/dal/user")

module.exports = {
    authenticate,
    getAll,
    getById,
    create
};

async function authenticate({username, password}) {
    const user = await users.findByLoginAndPassword(username, password);
    if (user) {
        const token = jwt.sign({sub: user.id, role: user.role}, config.secret);
        const {dataValues: {password, ...userWithoutPassword}} = user;
        return {
            ...userWithoutPassword,
            token
        };
    }
}

async function getAll() {
    const allUsers = await users.getAll();
    return allUsers.map(user => {
        const {dataValues: {password, ...userWithoutPassword}} = user;
        return userWithoutPassword;
    });
}

async function getById(id) {
    const user = await users.getById(id);
    if (!user) return;
    const {dataValues: {password, ...userWithoutPassword}} = user;
    return userWithoutPassword;
}

async function create(user) {
    return  await users.create(user)
}