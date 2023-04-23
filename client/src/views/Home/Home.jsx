import {useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { getPokemons, filterPokemonsByTypes, filterPokemonsByOrigin,PokemonsOrderName,PokemonsOrderAttack } from "../../redux/actions";
import style from "./Home.module.css"
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import Paginated from "../../components/Paginated/Paginated";
import NavBar from "../../components/NavBar/NavBar";
import { cleanData } from "../../redux/actions";

const Home = () =>{
    const dispatch = useDispatch();

    const allPokemons = useSelector(state => state.pokemons)
    const [order,setOrder] = useState("");
    const [currentPage,setCurrentPage] = useState(1);
    const [pokemonsPerPage,setPokemonPerPage] = useState(12);
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;

    const currentPokemon = allPokemons.slice(indexOfFirstPokemon,indexOfLastPokemon);

    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber);
    }

    useEffect(()=>{
        dispatch(getPokemons());
        return() =>{
            dispatch(cleanData());
        };
    },[dispatch]);  
    
    const handleClick = (event) =>{
        event.preventDefault();
        dispatch(getPokemons());
    }

    const handlerFilterTypes = (event) =>{
        dispatch(filterPokemonsByTypes(event.target.value));
        setCurrentPage(1);
    }
    
    const handlerFilterOrigin = (event) =>{
        dispatch(filterPokemonsByOrigin(event.target.value));
        setCurrentPage(1);
    }

    const handlerPokemonOrderName = (event) =>{
        dispatch(PokemonsOrderName(event.target.value));
        setOrder(`${event.target.value}`)
    }

    const handlerPokemonOrderAttack = (event) =>{
        dispatch(PokemonsOrderAttack(event.target.value));
        setOrder(`${event.target.value}`)
    }

    return (
        
        <div className={style.page}>
            <NavBar/>
            <div className={style.container}>
            <button onClick={handleClick}>Cargar todos los pokemones</button>
            <div className={style.selects}>
                <select value="order" onChange={handlerPokemonOrderName}>
                    <option value="order" disabled>Order by name</option>   
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
                <select value="order" onChange={handlerPokemonOrderAttack}>
                    <option value="order" disabled>Order by attack</option>   
                    <option value="max-atq">max-atq</option>
                    <option value="min-atq">min-atq</option>
                </select>
                <select value="filter" onChange={handlerFilterTypes}>
                    <option value="all">Todos</option>
                    <option value="normal">normal</option>
                    <option value="fighting">fighting</option>
                    <option value="poison">poison</option>
                    <option value="ground">ground</option>
                    <option value="rock">rock</option>
                    <option value="bug">bug</option>
                    <option value="ghost">ghost</option>
                    <option value="steel">steel</option>
                    <option value="fire">fire</option>
                    <option value="water">water</option>
                    <option value="grass">grass</option>
                    <option value="electric">electric</option>
                    <option value="psychic">psychic</option>
                    <option value="ice">ice</option>
                    <option value="dragon">dragon</option>
                    <option value="dark">dark</option>
                    <option value="fairy">fairy</option>
                    <option value="unknown">unknown</option>
                    <option value="shadow">shadow</option>
                </select>
                <select value="filter" onChange={handlerFilterOrigin}>
                    <option value="all">Todos</option>
                    <option value="created">Creados</option>
                    <option value="api">existentes</option>

                </select>
            </div>
            <Paginated 
            pokemonsPerPage = {pokemonsPerPage} 
            allPokemons={allPokemons.length} 
            paginado = {paginado}
            />
            <CardsContainer currentPokemon={currentPokemon}/>
        </div>
        </div>
    )
}

export default Home;