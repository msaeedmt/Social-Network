const validator = require('validator');
const _ = require('lodash')

module.exports = function validateRegisterInput(data) {
    var errors = {};

    if (!validator.isLength(data.name, { min: 2, max: 20 })) {
        errors.name = "Name must be between 2 and 20 characters"
    };

    return {
        errors,
        isValid: _.isEmpty(errors)
    }
}