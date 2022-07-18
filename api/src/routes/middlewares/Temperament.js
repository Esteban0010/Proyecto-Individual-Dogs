const { Router } = require('express');

const router = Router();


router.get("/",(req,res)=>{
    res.send("probando middlewares")
})


module.exports = router;