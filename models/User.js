const mongoose=require('mongoose')
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

let User=mongoose.model('users',UserShcema);

module.exports=User;