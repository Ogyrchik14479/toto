const User = require("../models/user")

module.exports = {
    findByLoginAndPassword,
    getById,
    getAll,
    create
}

function findByLoginAndPassword(username, password) {
    return User.findOne({
        where:{
            username: username,
            password: password
        }
    })
}

function getById(id) {
    return User.findByPk(id);
}

function getAll() {
    return User.findAll();
}

function create(user) {
    return User.create(user);
}
