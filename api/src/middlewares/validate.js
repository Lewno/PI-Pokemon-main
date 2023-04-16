
const validate = (req,res,next) =>{
    const {name,image,hp,attack,defense} = req.body;
    if(!name) return res.status(400).json({error : "Missing name"});
    if(!image) return res.status(400).json({error : "Missing name"});
    if(!hp) return res.status(400).json({error : "Missing name"});
    if(!attack) return res.status(400).json({error : "Missing name"});
    if(!defense) return res.status(400).json({error : "Missing name"});
    next();
}

module.exports = validate;