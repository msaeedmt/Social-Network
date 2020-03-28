const express=require('express')
const router=express.Router();

// @route     GET api/profiles/
// @desc      Tests profiles route
// @access    public
router.get('/',(req,res)=>res.json({msg:"welcome to the profiles page!"}));

module.exports=router;