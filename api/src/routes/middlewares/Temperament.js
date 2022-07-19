const { default: axios } = require('axios');
const { Router } = require('express');
const { Temperament } = require('../../db');



const router = Router();
router.get("/",async(req,res)=>{
try {
    let  allTemperam = await Temperament.findAll()
    res.json(allTemperam)
    
} catch (error) {
    res.send("La consulta  a la DB de Temperament salio mal")
}
})





    
    



module.exports = router;