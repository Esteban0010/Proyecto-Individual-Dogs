const initialState ={
    dogs : [],
    allDogs: []
}

function rootReducer( state = initialState,action){
    switch(action.type){
        case 'GET_ALL_DOGS':
            return{
                ...state,
                dogs:action.payload,
                allDogs: action.payload
            }
            case 'GET_NAME_DOGS':
                return{
                    ...state,
                    dogs: action.payload
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
            case 'FILTER_BY_TEMPERAMENT':
                const allDogs = state.allDogs
                const temperamentFilter = action.payload
                return{
                    

                }
            case 'FILTER_CREATED':
                const createdFilter = action.payload === 'created' ? state.allDogs.filter(e => e.createdInDb) : state.allDogs.filter(e => !e.createdInDb);
                return{
                    ...state,
                    dogs: createdFilter
                }
        
            default :
            return state
    }
    
}
export default rootReducer;