const { Router } = require('express');
const { route } = require('..');

const router = Router();


router.get("/",(req,res)=>{
    res.send("probando middlewares")
})


module.exports = router;