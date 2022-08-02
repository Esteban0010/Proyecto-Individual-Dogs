
const initialState ={
    dogs : [],
    DogsFiltrados: [],
    temperaments:[],
    detail:[],
}

function rootReducer( state = initialState,action){
    switch(action.type){
        case 'GET_ALL_DOGS':
            return{
                ...state,
                dogs:action.payload,
                DogsFiltrados: action.payload,
               
            }
            case 'GET_NAME_DOGS':
                return{
                    ...state,
                    DogsFiltrados: action.payload
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
                console.log(state.DogsFiltrados)
                let sortdArr =action.payload=== 'asc' ?
                state.DogsFiltrados.sort(function(a,b){
                    if(a.name.toLowerCase() > b.name.toLowerCase()){
                        return 1;
                    }
                    if(b.name.toLowerCase() > a.name.toLowerCase()){
                        return -1;
                    }
                    return 0
                }):
                state.DogsFiltrados.sort(function(a,b){
                    if(a.name.toLowerCase() > b.name.toLowerCase()){
                        return -1;
                    }
                    if(b.name.toLowerCase() > a.name.toLowerCase()){
                        return 1;
                    }
                    return 0;
                })
                return{
                    ...state,
                    DogsFiltrados:sortdArr
                }
                case 'ORDER_BY_WEIGHT':
                let sortdWeight =action.payload=== 'min' ?
                state.DogsFiltrados.sort(function(a,b){
                   
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
                state.DogsFiltrados.sort(function(a,b){
                    
                    
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
                    DogsFiltrados:sortdWeight
                }
            case 'FILTER_CREATED':
                const createdFilter = action.payload === 'created' ? state.DogsFiltrados.filter(e => e.createdInDb) : state.DogsFiltrados.filter(e => !e.createdInDb);
                return{
                    ...state,
                    DogsFiltrados: createdFilter
                }
            case 'FILTER_BY_TEMPERAMENT':
                const filterTemps = action.payload=== "All" ?state.dogs : state.DogsFiltrados.filter((a)=> a.temperaments.includes(action.payload));
                return{
                    ...state,
                    DogsFiltrados:filterTemps
                }
            case 'GET_DETAILS':
                return{
                    ...state,
                    detail: action.payload
                }
                case "CREATE_DOGS":
                return{
                    ...state
                }
            default :
            return state
    }
    
}
export default rootReducer;