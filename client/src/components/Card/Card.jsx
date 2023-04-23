import { Link } from "react-router-dom";
import style from "./Card.module.css"

const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
    steel:"#46473E",
    shadow:"#00000099"
};

const Card = ({id,name,image,types,hp,attack,defense}) =>{
    const color = typeColor[types[0]]
    return (
        <div className={style.card} style={{background:`radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`}}>
            <img className={style.image} src={image} alt="" />
            <Link to={`/detail/${id}`}>
             <h2 className={style.name}>{name}</h2>
            </Link>
            <div className={style.types}>
            {types.map((type)=>{
                return(
                    <span style={{background: typeColor[type]}} key={type}>{type}</span>
                );
            })}
            </div>
            <div className={style.stats}>
                <div>
                    <h3>{hp}</h3>
                    <p>Hp</p>
                </div>
                <div>
                    <h3>{attack}</h3>
                    <p>Attack</p>
                </div>
                <div>
                    <h3>{defense}</h3>
                    <p>Defense</p>
                </div>
            </div>
        </div>
    )
}

export default Card;