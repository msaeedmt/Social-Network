const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile')
const validatePostInput = require('../../validation/post');


// @route     GET api/posts
// @desc      get all posts
// @access    public
router.get('/', (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json(err));
})


// @route     GET api/posts/:id
// @desc      get post by id
// @access    public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(400).json(err));
})


// @route     POST api/posts
// @desc      create a post
// @access    private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    let { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const { text, name, avatar } = req.body;
    const user = req.user.id;

    const newPost = new Post({
        text, name, avatar, user
    });

    newPost.save().then(post => {
        res.json(post);
    }).catch(err => res.json({ msg: 'Unable to save to the database!' }));
})


// @route     DELETE api/posts/:id
// @desc      delete a post
// @access    private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(Profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (post.user.toString() !== req.user.id) {
                        return res.status(401).json({ notAuthorized: "User not authorized!" })
                    }

                    post.remove().then(() => res.json({ success: true }));
                })
        }).catch(err => res.status(400).json(err));
});

module.exports = router;