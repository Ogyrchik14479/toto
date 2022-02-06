const express = require('express');
const router = express.Router();
const userService = require('../servicies/user.service');
const authorize = require('helpers/authorize')
const Role = require('helpers/role');
const User = require("../models/user")

router.post('/authenticate', authenticate);
router.post('/', create);
router.get('/', authorize(Role.Admin), getAll);
// router.get('/test', (req, res) => {
//     User.findAll()
//         .then(user => {
//             res.json(user)
//         })
//         .catch(error => {
//             console.log(error);
//             res.status(500).send(error);
//         })
// })
router.get('/:id', authorize(), getById);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({message: 'Username or password is incorrect'}))
        .catch(err => next(err));
}


function getAll(req, res) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => console.log(err));
}

function create(req, res, next) {
    userService.create(req.body)
        .then(user => res.json(user.id))
        .catch(err => next(err));
}

function getById(req, res, next) {
    const currentUser = req.user;
    const id = parseInt(req.params.id);

    if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
        return res.status(401).json({message: 'Unauthorized'});
    }

    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}
