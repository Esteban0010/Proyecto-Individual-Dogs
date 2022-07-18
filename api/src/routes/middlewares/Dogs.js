const { Router } = require('express');
const axios = require('axios')
const { Dog, Temperament } = require('../../db');
const router = Router();

const GetApiInfo = async () => {
    const apiURL = await axios.get("https://api.thedogapi.com/v1/breeds");
    const apiInfo = await apiURL.data.map(el => {
        return {
            id: el.id,
            name: el.name,
            height: el.height.metric,
            weight: el.weight.metric,
            life_span: el.life_span,
            image: el.image.url,
            temperament: el.temperament
        }
    })
    return apiInfo;
};

const getDbInfo = async () => {
const allDogsDb = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: [],
            }
        }
    })
const allDogsResult = await allDogsDb.map(e =>{
    return{
        id: e.id,
        name: e.name,
        weight: e.weight,
        height: e.height,
        life_span: e.life_span,
        temperament: e.temperament.map(t =>t.name).join()
    }
})

}

const getAllDogs = async () => {
    const apiInfo = await GetApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal
}

router.get("/", async (req, res) => {
    const name = req.query.name

    let dogsTotal = await getAllDogs();
    if(name){
        let dogsName = await dogsTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
        if(dogsName.length){
            res.status(200).send(dogsName);
        }else{
            res.status(404).send("No existe esa raza de perro");
        }
    }else{
    res.status(200).json(dogsTotal)
    }
})



module.exports = router;