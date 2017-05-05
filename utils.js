function _generatePassword() {
    var password = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 40; i++)
        password += possible.charAt(Math.floor(Math.random() * possible.length));

    return password;
}

var _passwordSlack = {};

module.exports = {
    generatePassword: _generatePassword,
    passwordSlack: _passwordSlack,
};