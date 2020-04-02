const validator = require('validator');
const _ = require('lodash')

module.exports = function validateProfileInput(data) {
    var errors = {};

    data.handle = !_.isEmpty(data.handle) ? data.handle : '';
    // data.status = !_.isEmpty(data.handle) ? data.handle : '';
    // data.skills = !_.isEmpty(data.handle) ? data.handle : '';

    if (!validator.default.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = 'Handle needs to be between 2 and 40 characters';
    }

    if (_.isEmpty(data.handle)) {
        errors.handle = 'Profile handle is required!';
    }

    if (_.isEmpty(data.status)) {
        errors.status = 'Status field is required!'
    }

    if (_.isEmpty(data.skills)) {
        errors.skills = 'Skills field is required!'
    }

    if (!_.isEmpty(data.website)) {
        if (!validator.default.isURL(data.website)) {
            errors.website = 'Not a valid URL!';
        }
    }

    if (!_.isEmpty(data.youtube)) {
        if (!validator.default.isURL(data.youtube)) {
            errors.youtube = 'Not a valid URL!';
        }
    }

    if (!_.isEmpty(data.twitter)) {
        if (!validator.default.isURL(data.twitter)) {
            errors.twitter = 'Not a valid URL!';
        }
    }

    if (!_.isEmpty(data.facebook)) {
        if (!validator.default.isURL(data.facebook)) {
            errors.facebook = 'Not a valid URL!';
        }
    }

    if (!_.isEmpty(data.linkedin)) {
        if (!validator.default.isURL(data.linkedin)) {
            errors.linkedin = 'Not a valid URL!';
        }
    }

    if (!_.isEmpty(data.instagram)) {
        if (!validator.default.isURL(data.instagram)) {
            errors.instagram = 'Not a valid URL!';
        }
    }

    return {
        errors,
        isValid: _.isEmpty(errors)
    }
}