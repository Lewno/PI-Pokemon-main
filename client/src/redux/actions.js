import axios from "axios";
import Swal from "sweetalert2";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMONS_BY_NAME = "GET_POKEMONS_BY_NAME";
export const GET_POKEMONS_BY_ID = "GET_POKEMONS_BY_ID";
export const GET_TYPES = "GET_TYPES";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const POKEMON_BY_ORDER_NAME = "POKEMON_BY_ORDER_NAME";
export const POKEMON_BY_ORDER_ATTACK = "POKEMON_BY_ORDER_ATTACK";
export const CLEAN_DATA = "CLEAN_DATA";

const URL_BASE = "https://pi-pokemon-main-production-6680.up.railway.app";


export const getPokemons = () => {
    return async function (dispatch) {
      try {
        const response = await axios.get(`${URL_BASE}/pokemons`);
        dispatch({ type: GET_POKEMONS, payload: response.data });
      } catch (error) {
        alert(error.message);
      }
    };
};

export const getPokemonsByName = (name) => {
    return async function (dispatch) {
      try {
        
        const response = await axios.get(`${URL_BASE}/pokemons?name=${name}`);
        dispatch({ type: GET_POKEMONS_BY_NAME, payload: response.data });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'No se pudo encomtrar ese pokemon',
        })
      }
    };
};

export const getDetail = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL_BASE}/pokemons/${id}`);
      dispatch({ type: GET_POKEMONS_BY_ID, payload: response.data });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const getTypes=()=>{
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL_BASE}/types`);
      dispatch({ type: GET_TYPES, payload: response.data });
    } catch (error) {
      alert(error.message);
    }
  };
}

export const postPokemon = (pokemon) =>{
  return async function (dispatch){
    try {
      const response = await axios.post(`${URL_BASE}/pokemons/`,pokemon);
      console.log(response);
      return response;
    } catch (error) {
      alert(error.message);
    }
  }
}

export const filterPokemonsByTypes = (value) =>{
  console.log(value)
    return {
       type: FILTER_BY_TYPE, payload: value 
    }
}

export const filterPokemonsByOrigin= (value) =>{
  console.log(value)
    return {
       type: FILTER_BY_ORIGIN, payload: value 
    }
}

export const PokemonsOrderName= (value) =>{

    return {
       type: POKEMON_BY_ORDER_NAME, payload: value 
    }
};

export const PokemonsOrderAttack= (value) =>{

  return {
     type: POKEMON_BY_ORDER_ATTACK, payload: value 
  }
};

export const cleanData = () =>{
  return{type:CLEAN_DATA};
}
