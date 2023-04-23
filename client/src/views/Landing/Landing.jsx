import { Link } from "react-router-dom";
import style from "./Landing.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";

const Landing = () =>{

    const dispatch = useDispatch();
    const pokemon = useSelector((state) => state.pokemons);

    const ramdom = () =>{
        return Math.floor(Math.random() * 826);
     }

    useEffect(() => {
        dispatch(getDetail(ramdom()));
      }, [dispatch]);


    return (
        <div className={style.page}>
            <div className={style.content}>
                <h1>Pokemon</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis omnis quisquam fugit numquam odit earum cumque temporibus inventore, officiis voluptatem reprehenderit voluptatum aperiam adipisci incidunt id quidem voluptas, laboriosam autem.</p>
                <Link to ="/home">
                    <button>Ingresar</button>
                </Link>
            </div>
            <img className={style.image} src={pokemon[0]?.image} alt="" />
        </div>
    )
}

export default Landing;