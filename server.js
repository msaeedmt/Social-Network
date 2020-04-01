const express = require('express');
const bodyparser = require('body-parser');
const passport=require('passport');

const mongoose = require("./database/mongoose");
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profiles = require('./routes/api/profiles');

const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(passport.initialize());
require('./config/passport')(passport);

const port = process.env.PORT || 3000;

app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/posts', posts);

app.listen(port, () => console.log('connected to the server ...'))

