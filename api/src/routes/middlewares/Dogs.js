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
    // const allDogsResult = await allDogsDb.map(e =>{
    //     return{
    //         id: e.id,
    //         name: e.name,
    //         weight: e.weight,
    //         height: e.height,
    //         life_span: e.life_span,
    //         temperament: e.temperament.map(t =>t.name.join())
    //     }
    // })

}

const getAllDogs = async () => {
    const apiInfo = await GetApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);

    return infoTotal
}
router.get("/", async (req, res) => {
    let { name } = req.query

    let dogsTotal = await getAllDogs();
    if (name) {
        let dogsName = dogsTotal.filter(e => { if (e && e.name) { return e.name.toLowerCase().includes(name.toLowerCase()) } });
        if (dogsName.length) {
            res.status(200).send(dogsName);
        } else {
            res.status(404).send("No existe esa raza de perro");
        }
    } else {
        res.status(200).json(dogsTotal)
    }
})

router.get("/:id", async (req, res) => {
    try {
        let { id } = req.params;

        id = Number(id);
        let dogsTotal = await getAllDogs();
        dogsTotal = dogsTotal.filter(e => { if (e && e.id) { return e.id === id } });
        console.log("dogs filtrado");
        if (dogsTotal.length) {
            res.status(201).json(dogsTotal)
        } else {
            res.send("No se encontro la raza del  Id")
        };
    } catch (error) {
        res.send(error)
    }
})


router.post("/", async (req, res) => {
    let { name, height, weight, life_span, createdInDb, temperament } = req.body;

    if (!name || !height || !weight) return res.status(404).send("Falta enviar datos obligatorios")
    try {
        let dogCreated = await Dog.create({
            name,
            height,
            weight,
            life_span,
            createdInDb,
        })
        await dogCreated.addTemperament(temperament)
        res.send("Personajes creado con exito")
    } catch (error) {
        return res.status(404).send("Error en alguno de los datos provistos")
    }
});



module.exports = router;