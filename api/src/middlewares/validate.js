
const validate = (req,res,next) =>{
    const {name,image,hp,attack,defense} = req.body;
    if(!name) return res.status(400).json({error : "Missing name"});
    if(!image) return res.status(400).json({error : "Missing image"});
    if(!hp) return res.status(400).json({error : "Missing hp"});
    if(!attack) return res.status(400).json({error : "Missing attack"});
    if(!defense) return res.status(400).json({error : "Missing defense"});
    next();
}

module.exports = validate;