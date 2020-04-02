const validator = require('validator');
const _ = require('lodash')

module.exports = function validateExperienceInput(data) {
    var errors = {};

    // data.email = !_.isEmpty(data.email) ? data.email : '';

    if (_.isEmpty(data.title)) {
        errors.title = 'Job title field is required!';
    }

    if (_.isEmpty(data.company)) {
        errors.company = 'Compnay field is required!';
    }

    if (_.isEmpty(data.from)) {
        errors.from = 'From date field is required!';
    }

    return {
        errors,
        isValid: _.isEmpty(errors)
    }
}