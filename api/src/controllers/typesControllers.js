const {Type } = require("../db");
const axios = require("axios");

const getAllTypes = async () =>{
    const infoDb = await Type.findAll();
    if(infoDb.length === 0){
        const infoApiTypes = await axios("https://pokeapi.co/api/v2/type");
        const allTypesName = infoApiTypes.data.results.map(type => type.name);
        allTypesName.forEach(async (name) => {
           await Type.create({name})
        });
        return allTypesName;
    }
     return infoDb;
};

module.exports =  getAllTypes;
