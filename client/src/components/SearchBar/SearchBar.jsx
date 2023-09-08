import { useState } from "react";
import {useDispatch} from "react-redux";
import { getPokemonsByName } from "../../redux/actions";
import style from "./SearchBar.module.css"

const SearchBar = () =>{
    const dispatch = useDispatch();
    const [name,setName] = useState("");

    const handleInputChange = (event) =>{
        setName(event.target.value);
    }

    const handleSumbit = (event) =>{
        event.preventDefault();
        dispatch(getPokemonsByName(name))
    }

    return(
        <div className={style.search}>
            <input type="text" placeholder="Buscar Pokemon..." onChange={handleInputChange}/>
            <button type="submit" onClick={handleSumbit}>Buscar</button>
        </div>
    )

}

export default SearchBar;