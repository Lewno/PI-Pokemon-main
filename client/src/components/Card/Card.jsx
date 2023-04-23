import { Link } from "react-router-dom";
import style from "./Card.module.css"
import typeColor from "../../Help/help";

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