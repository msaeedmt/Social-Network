const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
    var errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.website = !isEmpty(data.website) ? data.website : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';
    data.youtube = !isEmpty(data.youtube) ? data.youtube : '';
    data.twitter = !isEmpty(data.twitter) ? data.twitter : '';
    data.facebook = !isEmpty(data.facebook) ? data.facebook : '';
    data.instagram = !isEmpty(data.instagram) ? data.instagram : '';
    data.linkedin = !isEmpty(data.linkedin) ? data.linkedin : '';

    if (!validator.default.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = 'Handle needs to be between 2 and 40 characters';
    }

    if (validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle is required!';
    }

    if (validator.isEmpty(data.status)) {
        errors.status = 'Status field is required!'
    }

    if (validator.isEmpty(data.skills)) {
        errors.skills = 'Skills field is required!'
    }

    if (!validator.isEmpty(data.website)) {
        if (!validator.default.isURL(data.website)) {
            errors.website = 'Not a valid URL!';
        }
    }

    if (!validator.isEmpty(data.youtube)) {
        if (!validator.default.isURL(data.youtube)) {
            errors.youtube = 'Not a valid URL!';
        }
    }

    if (!validator.isEmpty(data.twitter)) {
        if (!validator.default.isURL(data.twitter)) {
            errors.twitter = 'Not a valid URL!';
        }
    }

    if (!validator.isEmpty(data.facebook)) {
        if (!validator.default.isURL(data.facebook)) {
            errors.facebook = 'Not a valid URL!';
        }
    }

    if (!validator.isEmpty(data.linkedin)) {
        if (!validator.default.isURL(data.linkedin)) {
            errors.linkedin = 'Not a valid URL!';
        }
    }

    if (!validator.isEmpty(data.instagram)) {
        if (!validator.default.isURL(data.instagram)) {
            errors.instagram = 'Not a valid URL!';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}