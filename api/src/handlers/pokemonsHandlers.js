const {getAllPokemons,getPokemonById,searchPokemonByName,postPokemon} = require("../controllers/pokemonsControllers")


const getPokemonsHandler = async (req,res)=>{
    const {name} = req.query;
    try {
        const pokemons = name ? await searchPokemonByName(name.toLowerCase()) : await getAllPokemons(); 
        res.status(200).json(pokemons);
    } catch (error) {
        res.status(404).json({error:error.message});
    }
};

const getPokemonIdHandler = async (req,res)=>{
    const {id} = req.params;
    try {
        const pokemon = await getPokemonById(id); 
        res.status(200).json(pokemon);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
};

const createPokemonHandler = async (req,res)=>{
    const {name,image,hp,attack,defense,speed,height,weight,types} = req.body;
    try {
        const pokemon = await postPokemon(name,image,hp,attack,defense,speed,height,weight,types); 
        res.status(200).json(pokemon);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
};

module.exports = {
    getPokemonsHandler,
    getPokemonIdHandler,
    createPokemonHandler
}