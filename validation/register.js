const validator = require('validator');
const _ = require('lodash')

module.exports = function validateRegisterInput(data) {
    var errors = {};

    data.email = !_.isEmpty(data.email) ? data.email : '';

    if (!validator.isLength(data.name, { min: 2, max: 20 })) {
        errors.name = "Name must be between 2 and 20 characters";
    };

    if (!validator.default.isEmail(data.email)) {
        errors.email = 'Email is invalid!';
    }

    if (!validator.default.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be more than 6 characters!';
    }

    if (!validator.default.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = 'Passwords must match!';
    }

    if (_.isEmpty(data.name)) {
        errors.name = 'Name field is required!';
    }

    if (_.isEmpty(data.email)) {
        errors.email = 'Email field is required!';
    }

    if (_.isEmpty(data.password)) {
        errors.password = 'Password field is required!';
    }

    if (_.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = 'Confirm Password field is required!';
    }

    return {
        errors,
        isValid: _.isEmpty(errors)
    }
}