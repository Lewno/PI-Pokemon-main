const { Router } = require('express');
const {
    getPokemonsHandler,
    getPokemonIdHandler,
    createPokemonHandler
} = require("../handlers/pokemonsHandlers")

const validate = require("../middlewares/validate");

const pokemonsRouter = Router();


pokemonsRouter.get("/",getPokemonsHandler);

pokemonsRouter.get("/:id",getPokemonIdHandler);

pokemonsRouter.post("/",validate,createPokemonHandler);

module.exports = pokemonsRouter;