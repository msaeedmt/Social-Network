const express=require('express');

const mongoose=require("./database/mongoose");
const users=require('./routes/api/users');
const posts=require('./routes/api/posts');
const profiles=require('./routes/api/profiles');

const app =express();

app.get('/',(req,res)=>res.send('Welcome!'));

const port=process.env.PORT || 3000;

app.use('/api/users',users);
app.use('/api/porfiles',profiles);
app.use('/api/posts',posts);

app.listen(port,()=> console.log('connected to the server ...'))

