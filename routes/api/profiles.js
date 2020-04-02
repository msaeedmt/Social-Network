const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const validateProfileInput = require('../../validation/profile')


// @route     GET api/profiles
// @desc      get current profile
// @access    private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    let errors = {};
    const userId = req.user.id;
    Profile.findOne({ user: userId })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noProfile = 'There is no profile for the user!';
                return res.status(404).json(errors);
            }
            res.json(profile);
        }).catch(err => {
            res.status(404).json(err);
        })
});


// @route     GET api/profiles/all
// @desc      get all profiles
// @access    public
router.get('/all', (req, res) => {
    let errors = {};

    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            if (!profiles) {
                errors.noProfile = 'There is no Profile!'
                return res.status(404).json(errors);
            }

            res.json(profiles);
        }).catch(err => res.status(404).json(err));
})

// @route     GET api/profiles/handle/:handle
// @desc      get user by handle
// @access    public
router.get('/handle/:handle', (req, res) => {
    let errors = {};

    Profile.findOne({ handle: req.params.handle })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noProfile = 'There is no profile for this user!'
                return res.status(404).json(errors);
            }

            res.json(profile);
        }).catch(err => res.status(404).json(err));
})


// @route     GET api/profiles/user/:user_id
// @desc      get user by user id
// @access    public
router.get('/user/:user_id', (req, res) => {
    let errors = {};

    Profile.findOne({ user: req.params.user_id })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noProfile = 'There is no profile for this user!'
                return res.status(404).json(errors);
            }

            res.json(profile);
        }).catch(err => res.status(404).json(err));
})


// @route     POST api/profiles
// @desc      create or edit user profile
// @access    private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
        res.status(400).json(errors);
    }

    const user = req.user.id;
    const { handle, company, website, location, bio, status, githubUsername } = req.body;
    const { youtube, twitter, facebook, linkedin, instagram } = req.body;
    const skills = req.body.skills.split(',');
    const userId = req.user.id;

    const profileFields = {};

    profileFields.social = {};

    if (user) profileFields.user = user
    if (handle) profileFields.handle = handle;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubUsername) profileFields.githubUsername = githubUsername;
    if (skills !== 'undefined') profileFields.skills = skills;
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    Profile.findOne({ user: userId }).then(profile => {
        if (profile) {
            Profile.findOneAndUpdate({ user: userId }, { $set: profileFields }, { new: true })
                .then(profile => res.json(profile))
                .catch(err => res.status(400).json(err))
        }
        else {
            Profile.findOne({ handle })
                .then(profile => {
                    if (profile) {
                        errors.handle = 'That handle already exists!'
                        res.status(400).json(errors);
                    }

                    new Profile(profileFields).save()
                        .then(profile => res.json(profile))
                })
        }
    })

})


// @route     POST api/profiles/experience
// @desc      add experience to user
// @access    private
router.get('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { title, company, location, from, to, current, description } = req.body;
    let errors = {};

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            const newExp = {
                title, company, location, from, to, current, description
            }

            profile.experience.unshift(newExp);

            profile.save().then(profile => res.json(profile));
        })
});

module.exports = router;