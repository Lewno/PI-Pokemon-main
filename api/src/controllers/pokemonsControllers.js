const { Pokemon,Type } = require("../db");
const axios = require("axios");

// Configuración de reintento de solicitud
axios.defaults.retry = 3; // Número máximo de intentos
axios.defaults.retryDelay = 1000; // Tiempo de espera (en milisegundos) entre intentos

axios.interceptors.response.use(null, (error) => {
  const config = error.config;
  if (!config || !config.retry) return Promise.reject(error);

  config.__retryCount = config.__retryCount || 0;

  if (config.__retryCount >= config.retry) {
    return Promise.reject(error);
  }

  config.__retryCount += 1;

  const delay = config.retryDelay || 0;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  }).then(() => axios(config));
});

const templateInfo = (info) =>{
    return {
        id: info.data.id,
        name: info.data.name,
        image: info.data.sprites.other.home.front_default,
        hp: info.data.stats[0].base_stat,
        attack: info.data.stats[1].base_stat,
        defense: info.data.stats[2].base_stat,
        speed: info.data.stats[5].base_stat,
        height: info.data.height || null,
        weight:info.data.weight || null,
        createdInBd:false,
        types: info.data.types.map((type) => 
        { 
            let name = type.type.name;
            return templateInfoType(name)
        }
        )
    }
}

const templateInfoType = (name) =>{ 
    return{
        name :name
    }
}

const getAllPokemons = async () => {
    // const apiPokeLote1 = await axios("https://pokeapi.co/api/v2/pokemon");
    // const Urllote2 = apiPokeLote1.data.next
    // const apiPokeLote2 = await axios(Urllote2);
    // const Urllote3 = apiPokeLote2.data.next
    // const apiPokeLote3 = await axios(Urllote3);
    // const allPoke = apiPokeLote1.data.results.concat(apiPokeLote2.data.results).concat(apiPokeLote3.data.results)
    
    const infodb = await Pokemon.findAll({ 
        include : {
            model: Type,
            attributes:["name"],
            through:{
                attributes: [],
           } 
        }}); 
    const infoApi = await axios("https://pokeapi.co/api/v2/pokemon?limit=60");
    const allPoke = infoApi.data.results;
    const allPokeUrl = allPoke.map((poke)=>poke.url);
    const data = await Promise.all(allPokeUrl.map( async (url) => {
        let info = await axios.get(url);
        return templateInfo(info);
    }))

    return [...infodb,...data];
};

const searchPokemonByName = async (name) =>{
    const getDataAll = await getAllPokemons();
    const pokeName = await getDataAll.filter((poke)=> poke.name == name);
    if(pokeName.length) return pokeName;
    else throw new Error("El nombre del pokemon no existe");
}

const getPokemonById = async(id) => {
    const getDataAll = await getAllPokemons();
    const pokeId = await getDataAll.filter((poke)=> poke.id == id);

    if(pokeId.length) return await pokeId;
    else throw new Error("El id del pokemon no existe");
};

const postPokemon = async (name,image,hp,attack,defense,speed,height,weight,types) =>{
    // se crea
    const pokeCreate = await Pokemon.create({name,image,hp,attack,defense,speed,height,weight});
    // se busca los tipos
    const typedb = await Type.findAll({
        where : {
            name : types.map(type => type)
        }
    });
    // se agrega los tipos
    await pokeCreate.addTypes(typedb);
    const newPoke = await Pokemon.findByPk(pokeCreate.id,{ 
            include : {
                model: Type,
                attributes:["name"],
                through:{
                    attributes: [],
               } 
            }});
    return newPoke;

};

module.exports = {
    getAllPokemons,
    getPokemonById,
    searchPokemonByName,
    postPokemon
};