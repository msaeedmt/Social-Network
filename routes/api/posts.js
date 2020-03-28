const express=require('express')
const router=express.Router();

// @route     GET api/posts/
// @desc      Tests posts route
// @access    public
router.get('/',(req,res)=>res.json({msg:"welcome to the posts page!"}));

module.exports=router;