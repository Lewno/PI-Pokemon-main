import { Link } from "react-router-dom";
import style from "./Landing.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import { cleanData } from "../../redux/actions";

const Landing = () =>{

    const dispatch = useDispatch();
    const pokemon = useSelector((state) => state.pokemons);

    const ramdom = () =>{
        return Math.floor(Math.random() * 826);
     }

    useEffect(() => {
        dispatch(getDetail(ramdom()));
        return() =>{
            dispatch(cleanData());
        };    
      }, [dispatch]);

    const handleButton = (event) =>{
        event.preventDefault();
        dispatch(getDetail(ramdom()));
        console.log("hola")
    }


    return (
        <div className={style.page}>
            <div className={style.card}>
                <div className={style.content}>
                    <h1>Pokemon App</h1>
                    <p>Aplicacion hecha por <a href="/">Lewno</a></p>
                    <Link to ="/home">
                        <button>Ingresar</button>
                    </Link>
                    <button onClick={handleButton}>Cambiar Pokemon</button>
                </div>
                <div className={style.poke}>
                    <img className={style.image} src={pokemon[0]?.image} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Landing;