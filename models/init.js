const User = require("./user");

module.exports = doInit

function doInit() {
    User.sync()
}