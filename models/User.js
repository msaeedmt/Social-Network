const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const Schema=mongoose.Schema;

const UserShcema=new Schema({
    name:{
        type: String ,
        require: true
    },
    email:{
        type: String ,
        require: true
    },
    password:{
        type: String ,
        require: true
    },
    avatar:{
        type: String ,
        require: true
    },
    data:{
        type: Date,
        default: Date.now
    }
});

UserShcema.pre('save', function (next) {
    let user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

const User=mongoose.model('users',UserShcema);

module.exports=User;