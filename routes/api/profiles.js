const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/Profile');
const User = require('../../models/User');


// @route     GET api/profiles
// @desc      get current profile
// @access    private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    let errors = {};

    Profile.findOne({ user: req.user.id }).then(profile => {
        if (!profile) {
            errors.noProfile = 'There is no profile for the user!';
            return res.status(404).json(errors);
        }
        res.json(profile);
    }).catch(err => {
        res.status(404).json(err);
    })
});

module.exports = router;