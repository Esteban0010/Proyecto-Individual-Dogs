const { Router } = require('express');
const axios = require('axios')
const { Dog } = require('../../db')
const router = Router();


router.get("/", async(req,res)=>{
    try {
        const dataApi =await axios.get("https://api.thedogapi.com/v1/breeds")
    //   let apifiltrada= dataApi.findAll({
    //     attributes: { exclude: ['bred_for','breed_group','reference_image_id',' image'] }
    //   })
        console.log(dataApi);
    // console.log(dataApi.length, "onjeee")
        res.send(dataApi)
    } catch (error) {
        res.send("no se ejecuto")
    }
})



module.exports = router;