
const initialState ={
    dogs : [],
    allDogs: [],
    allDogsT: [],
    temperaments:[],
    detail:[],
}

function rootReducer( state = initialState,action){
    switch(action.type){
        case 'GET_ALL_DOGS':
            return{
                ...state,
                dogs:action.payload,
                allDogs: action.payload,
                allDogsT: action.payload
            }
            case 'GET_NAME_DOGS':
                return{
                    ...state,
                    dogs: action.payload
                }
            case 'POST_CHARACTER':
                return{
                    ...state,
                }
            case 'GET_TEMPERAMENTS':
                return{
                    ...state,
                    temperaments: action.payload,
                }
            case 'ORDER_BY_NAME':
                let sortdArr =action.payload=== 'asc' ?
                state.dogs.sort(function(a,b){
                    if(a.name > b.name){
                        return 1;
                    }
                    if(b.name > a.name){
                        return -1;
                    }
                    return 0
                }):
                state.dogs.sort(function(a,b){
                    if(a.name > b.name){
                        return -1;
                    }
                    if(b.name > a.name){
                        return 1;
                    }
                    return 0;
                })
                return{
                    ...state,
                    dogs:sortdArr
                }
                case 'ORDER_BY_WEIGHT':
                let sortdWeight =action.payload=== 'min' ?
                state.dogs.sort(function(a,b){
                   
                    if(a.weight[0] > b.weight[0]){
                        return 1;
                    }
                    if(b.weight[0] > a.weight[0]){
                        return -1;
                    }
                    if(b.weight[0] === a.weight[0]){
                        if(a.weight[1] > b.weight[1]){
                            return 1;
                        }
                        if(b.weight[1] > a.weight[1]){
                            return -1;
                        }
                        return 0;
                    }
                    return 0
                }):
                state.dogs.sort(function(a,b){
                    console.log("entrando a")
                    
                    if(a.weight[0] > b.weight[0]){
                        return -1;
                    }
                    if(b.weight[0] > a.weight[0]){
                        return 1;
                    }
                    if(b.weight[0] === a.weight[0]){
                        if(a.weight[1] > b.weight[1]){
                            return -1;
                        }
                        if(b.weight[1] > a.weight[1]){
                            return 1;
                        }
                        return 0;
                    }
                    return 0;
                })
                return{
                    ...state,
                    dogs:sortdWeight
                }
            case 'FILTER_CREATED':
                const createdFilter = action.payload === 'created' ? state.allDogs.filter(e => e.createdInDb) : state.allDogs.filter(e => !e.createdInDb);
                return{
                    ...state,
                    dogs: createdFilter
                }
            case 'FILTER_BY_TEMPERAMENT':
                const alldogss= state.allDogsT
                const filterTemps = action.payload=== "All" ?alldogss : alldogss.filter((a)=> a.temperaments.includes(action.payload));
                return{
                    ...state,
                    dogs:filterTemps
                }
            case 'GET_DETAILS':
                return{
                    ...state,
                    detail: action.payload
                }
            default :
            return state
    }
    
}
export default rootReducer;