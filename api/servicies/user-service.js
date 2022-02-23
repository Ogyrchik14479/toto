const config = require('../../config.json');
const jwt = require('jsonwebtoken');
const users = require("../../db/dal/user")

class UserService {
    async authenticate({username, password}) {
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

    async getAll() {
        const allUsers = await users.getAll();
        return allUsers.map(user => {
            const {dataValues: {password, ...userWithoutPassword}} = user;
            return userWithoutPassword;
        });
    }

    async getById(id) {
        const user = await users.getById(id);
        if (!user) return;
        const {dataValues: {password, ...userWithoutPassword}} = user;
        return userWithoutPassword;
    }

    async create(user) {
        return await users.create(user)
    }
}

module.exports = new UserService();