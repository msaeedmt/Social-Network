const validator = require('validator');
const _ = require('lodash')

module.exports = function validateLoginInput(data) {
    var errors = {};

    data.email = !_.isEmpty(data.email) ? data.email : '';

    if (!validator.default.isEmail(data.email)) {
        errors.email = 'Email is invalid!';
    }

    if (_.isEmpty(data.email)) {
        errors.email = 'Email field is required!';
    }

    if (_.isEmpty(data.password)) {
        errors.password = 'Password field is required!';
    }

    return {
        errors,
        isValid: _.isEmpty(errors)
    }
}