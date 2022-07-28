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
        let height_max= el.height.metric.split("-").pop().trim()
        let height_min= el.height.metric.split("-").shift().trim()
        let weight_max= el.weight.metric.split("-").pop().trim()
        let weight_min= el.weight.metric.split("-").shift().trim()
        let life_span_min= el.life_span.split("-").shift()
        let life_span_max= el.life_span.split("-").pop().trim().split(" ").shift()
        return {
            id: el.id,
            name: el.name,
            weight:[Number(weight_min),Number(weight_max)],
            height:[Number(height_min),Number(height_max)],
            life_span:[Number(life_span_min),Number(life_span_max)],
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
    let { name, height, weight, life_span, createdInDb, temperament ,image} = req.body;
    console.log(req.body)

    if (!name || !height || !weight) return res.status(404).send("Falta enviar datos obligatorios")
    try {
        console.log("entre al try")
        let dogCreated = await Dog.create({
            name,
            height,
            weight,
            life_span,
            image,
            createdInDb,
        })
        await dogCreated.addTemperament(temperament)
        
        return res.send("Personajes creado con exito")
    } catch (error) {
        console.log("entre al catch")
        return res.status(404).send("Error en alguno de los datos provistos")
    }
});



module.exports = router;