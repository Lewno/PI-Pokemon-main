import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getDetail } from "../../redux/actions";
import { Link } from "react-router-dom";

const Detail = () =>{
    const dispatch = useDispatch();
    const {id} = useParams();
  const pokemon = useSelector((state) => state.pokemons);


    useEffect(() => {
        dispatch(getDetail(id));
      }, [dispatch]);
    return (    
        <>
            <h1>{pokemon[0].name}</h1>
            <p>{pokemon[0].hp}</p>
            <p>{pokemon[0].attack}</p>
            <p>{pokemon[0].defense}</p>
            <p>{pokemon[0].speed}</p>
            <p>{pokemon[0].height}</p>
            <p>{pokemon[0].weight}</p>
            <img src={pokemon[0].image} alt={pokemon[0].id} />
            {pokemon[0].types.map(type =>{
              return (<p key={type.name}>{type.name}</p>)
            })}
            <Link to="/home">
              <button>Volver</button>
            </Link>
        </>
    );
}

export default Detail;