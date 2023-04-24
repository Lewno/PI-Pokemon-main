import { 
  GET_POKEMONS,
  GET_POKEMONS_BY_NAME,
  GET_POKEMONS_BY_ID,
  GET_TYPES,
  FILTER_BY_TYPE,
  FILTER_BY_ORIGIN,
  POKEMON_BY_ORDER_NAME,
  POKEMON_BY_ORDER_ATTACK,
  CLEAN_DATA
 } from "./actions";

const initialState = {
    pokemons: [],
    allPokemons: [],
    types:[]
};

const rootReducer = (state = initialState,action) =>{
    switch(action.type){
      
      case GET_POKEMONS:
        return{
          ...state,
          pokemons:action.payload,
          allPokemons:action.payload
        };
      case GET_POKEMONS_BY_NAME:
        return{
          ...state,
          pokemons:action.payload
        };

      case GET_POKEMONS_BY_ID:
        return{
          ...state,
          pokemons:action.payload
        };
        case GET_TYPES:
          return{
            ...state,
            types:action.payload
          };
      case FILTER_BY_TYPE:
        const allPokemons = state.allPokemons;
        const typeFiltered = action.payload === "all" ? allPokemons : allPokemons.filter((poke) => {
          return poke.types.some(type=>type.name===action.payload)
        });
        return{
          ...state,
          pokemons : typeFiltered
        }
      case FILTER_BY_ORIGIN:
        const allPoke = state.allPokemons;  
        const createdFiltered = action.payload === "created" ? allPoke.filter((poke) => poke.createdInBd) : allPoke.filter((poke) => !poke.createdInBd);
      
        return{
        ...state,
          pokemons : action.payload === "all" ? allPoke : createdFiltered
        }
      case POKEMON_BY_ORDER_NAME:
        const sorted = action.payload === "asc" ?
        state.pokemons.sort((a,b)=>{
          if(a.name.toLowerCase()>b.name.toLowerCase()) return 1;
          if(a.name.toLowerCase()<b.name.toLowerCase()) return -1;
          return 0;
        }) : 
        state.pokemons.sort((a,b)=>{
          if(a.name.toLowerCase()>b.name.toLowerCase()) return -1;
          if(a.name.toLowerCase()<b.name.toLowerCase()) return 1;
          return 0;
        })
      return{
        ...state,
        pokemons : sorted
      }
    case POKEMON_BY_ORDER_ATTACK: 
      const sortedAttack = action.payload === "max-atq" ?
        state.pokemons.sort((a,b)=>b.attack - a.attack) : 
        state.pokemons.sort((a,b)=>a.attack - b.attack)
      return{
        ...state,
        pokemons : sortedAttack
      } 
    case CLEAN_DATA:
        return{
            ...state,
            pokemons:[]
        }
    default:
        return {...state};
    }
    
    
  };
  

export default rootReducer;

