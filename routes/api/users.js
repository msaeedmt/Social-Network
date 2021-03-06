const express = require('express')
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcryptjs');

const secretKey = require('../../config/keys').secretKey;
const User = require('../../models/User');
const validRigsterInput = require('../../validation/register');
const validLoginInput = require('../../validation/login');

const router = express.Router();

// @route     GET api/users/
// @desc      Tests users route
// @access    Public
router.get('/', (req, res) => res.json({ msg: "welcome to the users page!" }));

// @route     POST api/users/register
// @desc      Register users
// @access    Public
router.post('/register', (req, res) => {

    let { errors, isValid } = validRigsterInput(req.body);
    if (!isValid) {
        return res.status(400).json({ errors });
    }

    let { name, email, password } = req.body;
    User.findOne({ email }).then(user => {
        if (user) {
            res.status(400).json({ email: "Email already exists!" });
        }
        else {
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });

            let newUser = new User({
                name,
                email,
                password,
                avatar
            });

            newUser.save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
        }
    })
});


// @route     POST api/users/login
// @desc      login user
// @access    Public
router.post('/login', (req, res) => {

    let { errors, isValid } = validLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json({ errors });
    }

    const { email, password } = req.body;

    User.findOne({ email }).then(user => {
        if (!user) {
            errors.email = 'Email not found!';
            return res.status(400).json(errors);
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = { id: user.id, name: user.name }

                jwt.sign(payload, secretKey, { expiresIn: 360000 }, (err, token) => {
                    res.send({
                        success: true,
                        token: "Bearer " + token
                    })
                })
            } else {
                errors.email = 'Password incorrect!'
                return res.status(400).json(errors);
            }
        }).catch(err => res.json(errors));
    })
    // User.findUser(email, password).then(user => {
    //     const payload = { id: user.id, name: user.name }

    //     jwt.sign(payload, secretKey, { expiresIn: 360000 }, (err, token) => {
    //         res.send({
    //             success: true,
    //             token: "Bearer " + token
    //         })
    //     })
    // }).catch(err => {
    //     res.json(err)
    // })
})

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json(req.user);
})


module.exports = router;
