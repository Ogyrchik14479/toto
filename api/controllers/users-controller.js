const userService = require('../servicies/user-service');
const Role = require('api/helpers/role');

class UsersController {
    authenticate(req, res, next) {
        userService.authenticate(req.body)
            .then(user => user ? res.json(user) : res.status(400).json({message: 'Username or password is incorrect'}))
            .catch(err => next(err));
    }

    getAll(req, res) {
        userService.getAll()
            .then(users => res.json(users))
            .catch(err => console.log(err));
    }

    create(req, res, next) {
        userService.create(req.body)
            .then(user => res.json(user.id))
            .catch(err => next(err));
    }

    getById(req, res, next) {
        const currentUser = req.user;
        const id = parseInt(req.params.id);

        if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
            return res.status(401).json({message: 'Unauthorized'});
        }

        userService.getById(req.params.id)
            .then(user => user ? res.json(user) : res.sendStatus(404))
            .catch(err => next(err));
    }
}

module.exports = new UsersController()
