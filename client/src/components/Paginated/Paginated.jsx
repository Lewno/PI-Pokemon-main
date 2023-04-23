
import style from "./Paginated.module.css"

const Paginated = ({pokemonsPerPage,allPokemons,paginado}) =>{
    const pageNumber = [];
    for(let i = 1; i<= Math.ceil(allPokemons/pokemonsPerPage);i++){
        pageNumber.push(i);
    }
    return(
        <div className={style.content}>
            {pageNumber?.map((number) =>
                    <button className={style.button} key={number} onClick={()=> paginado(number)}>{number}</button>
                )}
        </div>
    )
}

export default Paginated;