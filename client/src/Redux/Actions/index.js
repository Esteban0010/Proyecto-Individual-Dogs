import axios from 'axios';
export const GET_ALL_DOGS =" OBTENER TODOS LOS DOGS";
export const GET_ID_RAZA = "OBTENER UNA RAZA";
export const FILTER_CREATED = "FILTRA DEPENDIENDO DE DONDE PROVIEEN LOS DOGS"


export function getDogs(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/dogs',{
            
        });
        return dispatch({
            type: 'GET_ALL_DOGS',
            payload: json.data
        })
    }
}
export function getNameDogs(name){
    return async function(dispatch){
        try{
            var json= await axios('http://localhost:3001/dogs?name=' + name)
            return dispatch({
                type:'GET_NAME_DOGS',
                payload: json.data
            })
        }catch(error){
            console.log(error)
        }
    }
}
export function filterbreedsByTemperament(payload){
    return{
        type: 'FILTER_BY_TEMPERAMENT',
        payload
    }
}

export function filterCreated(payload){
    console.log("entre a la accion")
    return {
        type: "FILTER_CREATED",
        payload
    }
}
export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}