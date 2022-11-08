import axios from 'axios';

export function getDogs() {
    // return fetch('http://localhost:3001/dogs')
    // .then((response) => response.json())
    // .then((json)=>{
    //     dispatch({type: GET_ALL_DOGS, payload:json.data})
    // })
    return async function (dispatch) {
        var json = await axios.get('/dogs', {

        });
        return dispatch({
            type: 'GET_ALL_DOGS',
            payload: json.data
        })
    }
}
export function getNameDogs(name) {
    return async function (dispatch) {
        try {
            var json = await axios.get('/dogs?name=' + name)
            return dispatch({
                type: 'GET_NAME_DOGS',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export function getTemperament() {
    return async function (dispatch) {
        var info = await axios.get("/temperaments", {

        });
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: info.data
        })
    }
}
export function postBreeds(payload) {
    return async function (dispatch) {
        try {
            const info = await axios.post('/dogs', payload)
            return dispatch({
                type: "CREATE_DOGS",
                payload: info.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}


export function filterCreated(payload) {
    return {
        type: "FILTER_CREATED",
        payload
    }
}
export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}
export function orderByWeight(payload) {
    return {
        type: 'ORDER_BY_WEIGHT',
        payload
    }
}
export function getDetail(id) {
    return async function (dispatch) {
        try {
            let json = await axios.get(`/dogs/${id}`);
            return dispatch({
                type:'GET_DETAILS',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export function filterByTemperament(payload) {
    return {
        type: 'FILTER_BY_TEMPERAMENT',
        payload
    }
}

