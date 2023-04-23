import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = () =>{
    return (
        <div className={style.nav}>
            <Link to="/home">
                <button className={style.icon}></button>
            </Link>
            <SearchBar/>
            <Link to="/create"><p>Crear Pokemon</p></Link>
        </div>
    )
}

export default NavBar;