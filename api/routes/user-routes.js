const express = require('express');
const authorize = require("../helpers/authorize");
const Role = require("../helpers/role");
const userController = require("../controllers/users-controller")

const router = express.Router();

router.post('/authenticate', userController.authenticate);
router.post('/', userController.create);
router.get('/', authorize(Role.Admin), userController.getAll);

router.get('/:id', authorize(), userController.getById);

module.exports = router;