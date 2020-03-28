const mongoose = require('mongoose');
const mongoURI=require('../config/keys').mongoURI;

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Connected to the database...");
}).catch(err => {
    console.log(err);
})

module.exports = {mongoose};

