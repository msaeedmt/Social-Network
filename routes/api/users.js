const express=require('express')
const router=express.Router();

// @route     GET api/users/
// @desc      Tests users route
// @access    public
router.get('/',(req,res)=>res.json({msg:"welcome to the users page!"}));

module.exports=router;