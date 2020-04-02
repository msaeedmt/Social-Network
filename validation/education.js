const validator = require('validator');
const _ = require('lodash')

module.exports = function validateEducationInput(data) {
    var errors = {};

    // data.email = !_.isEmpty(data.email) ? data.email : '';

    if (_.isEmpty(data.school)) {
        errors.school = 'School field is required!';
    }

    if (_.isEmpty(data.degree)) {
        errors.degree = 'Degree field is required!';
    }

    if (_.isEmpty(data.fieldOfStudy)) {
        errors.fieldOfStudy = 'Field of study field is required!';
    }

    if (_.isEmpty(data.from)) {
        errors.from = 'From date field is required!';
    }

    return {
        errors,
        isValid: _.isEmpty(errors)
    }
}