import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getDetail } from "../../redux/actions";
import { cleanData } from "../../redux/actions";
import { Link } from "react-router-dom";
import style from "./Detail.module.css";
import typeColor from "../../Help/help";

const Detail = () =>{
    const dispatch = useDispatch();
    const {id} = useParams();
  const pokemon = useSelector((state) => state.pokemons);

  const vida = `${pokemon[0]?.hp/2}%`;
  const ataque = `${pokemon[0]?.attack/2}%`;
  const defensa = `${pokemon[0]?.defense/2}%`;
  const velocidad = `${pokemon[0]?.speed/2}%`;

  const color = typeColor[pokemon[0]?.types[0].name];

    useEffect(() => {
        dispatch(getDetail(id));

        return() =>{
          dispatch(cleanData());
      };
      }, [dispatch]);
    return (    
        <div className={style.page}>
              <Link to="/home">
                <button></button>
              </Link>
          <div className={style.container}>
              <div className={style.card} style={{background:`radial-gradient(circle 65rem at 50% 0%, ${color} 35%, #ffffff) `}}>
                <h1>{pokemon[0]?.name}</h1>
                <img className={style.image} src={pokemon[0]?.image} alt={pokemon[0]?.id} />
                <div className={style.types}>
                  {pokemon[0]?.types.map(type =>{
                  return (<span style={{background: typeColor[type.name]}} key={type.name}>{type.name}</span>)
                  })}
                </div>
              </div>
              <div className={style.stats}>
                <div>
                  <p>HP</p>
                  <div className={style.bar}>
                     <div className={style.data} style={{width:vida, background:"#04AA6D"}}>{pokemon[0]?.hp}</div>
                  </div>
                  <p>Attack</p>
                  <div className={style.bar}>
                     <div className={style.data} style={{width:ataque, background:"#2196F3"}}>{pokemon[0]?.attack}</div>
                  </div>
                  <p>Defense</p>
                  <div className={style.bar}>
                     <div className={style.data} style={{width:defensa, background:"#f44336"}}>{pokemon[0]?.defense}</div>
                  </div>
                  <p>Speed</p>
                  <div className={style.bar}>
                     <div className={style.data} style={{width:velocidad, background:"#808080"}}>{pokemon[0]?.speed}</div>
                  </div>    
                </div>
                <div className={style.vol}>
                  <div className={style.height}>
                    <p>ALTURA</p>
                    <p className={style.box}>{pokemon[0]?.height}</p>
                  </div>
                  <div className={style.weight}>
                    <p>PESO</p>
                    <p className={style.box}>{pokemon[0]?.weight}</p>
                  </div>
                </div>
              </div>          
          </div>
        </div>
    );
}

export default Detail;