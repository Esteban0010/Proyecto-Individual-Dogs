const { default: axios } = require('axios');
const { Temperament } = require('../db');

  module.exports = { 
    async  getAllTemperament  (){
        const tempApi = await axios.get("https://api.thedogapi.com/v1/breeds")
        const conjTemp = tempApi.data.map(e => e.temperament);
       let array = new Set()
       conjTemp.forEach(e => {if(e){e.split(",").map(e => array.add(e.trim()))}});
        let result = Array.from(array)
        let tempFinish = result.map( (temperament,i) => {return {name :temperament, id:i}})
        Temperament.bulkCreate(tempFinish)
        console.log("Los temperamentos ya fueron guardado en la base de Datos")
    }
  } 
    



