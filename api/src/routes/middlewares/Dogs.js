const { Router } = require('express');
const axios = require('axios')
const { Dog, Temperament } = require('../../db');
const router = Router();

const GetApiInfo = async () => {
    const apiURL = await axios.get("https://api.thedogapi.com/v1/breeds");
    const apiInfo = await apiURL.data.map(el => {
        let temperaments
        if(el.temperament){
     temperaments= el.temperament.split(",").map(t=> t.trim())}
    else{
         temperaments= ["Sin Temperamentos registrados"]
    }
        return {
            id: el.id,
            name: el.name,
            height_max: el.height.metric.split("-").pop().trim(),
            height_min: el.height.metric.split("-").shift().trim(),
            weight_max: el.weight.metric.split("-").pop().trim(),
            weight_min: el.weight.metric.split("-").shift().trim(),
            life_span_min: el.life_span.split("-").shift(),
            life_span_max:el.life_span.split("-").pop().trim().split(" ").shift(),
            image: el.image.url,
            temperaments: temperaments
        }
    })
    return apiInfo;
};

const getDbInfo = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            through: {
                attributes: [],
            }
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
        // const id =req.params.id;
        // const dogsTotal = await getAllDogs();
        // if(id){
        //     let dogId = await dogsTotal.filter(el=>el.id ==id);
        //     dogId.length?
        //     res.status(201).json(dogId):
        //     res.status(404).send("No se encontro el personaje")
        // }

        
        // console.log(DogDB,"/////////")
        let { id } = req.params;
        let a = Number(id)
        if (!a) {
            console.log("entre a if",id)
            let dogsTotal = await Dog.findByPk(id, {
                include: {
                    model: Temperament,
                    through: { attributes: [] },
                }
            })
            console.log(dogsTotal)
            if ( Object.keys(dogsTotal).length > 0) {
             return   res.status(201).json(dogsTotal)
            } else {
             return   res.send("No se encontro la raza del  Id")
            };
        } else {
            console.log("entre al else")
            id = Number(id);
            let dogsTotal = await getAllDogs();
            dogsTotal = dogsTotal.filter(e => { if (e && e.id) { return e.id === id } });
            if (dogsTotal.length) {
               return res.status(201).json(dogsTotal)
            } else {
              return  res.send("No se encontro la raza del  Id")
            };
        }
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