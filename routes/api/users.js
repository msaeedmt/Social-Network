const express=require('express')
const gravatar=require('gravatar');

const User=require('../../models/User');

const router=express.Router();


// @route     GET api/users/
// @desc      Tests users route
// @access    Public
router.get('/',(req,res)=>res.json({msg:"welcome to the users page!"}));


// @route     POST api/users/register
// @desc      Register users
// @access    Public
router.post('/register',(req,res)=>{
    let {name,email,password}=req.body;
    User.findOne({email}).then(user=>{
        if(user){
            res.status(400).json({email:"Email already exists!"});
        }
        else{
            const avatar=gravatar.url(email,{
                s:'200',
                r:'pg',
                d:'mm'
            });

            let newUser=new User({
                name,
                email,
                password,
                avatar
            });

            newUser.save()
            .then(user=>res.json(user))
            .catch(err=>console.log(err));
        }
    })
});

module.exports=router;