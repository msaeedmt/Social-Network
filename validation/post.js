const Validator = require('validator');
const _ = require('lodash');

module.exports = function validatePostInput(data) {
    let errors = {};

    if (!Validator.isLength(data.text, { min: 5, max: 300 })) {
        errors.text = 'Post must be between 10 and 300 characters';
    }

    if (_.isEmpty(data.text)) {
        errors.text = 'Text field is required';
    }

    return {
        errors,
        isValid: _.isEmpty(errors)
    };
};