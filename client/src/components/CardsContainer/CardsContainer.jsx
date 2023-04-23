import Card from "../Card/Card";
import style from "./CardsContainer.module.css";




const CardsContainer = ({currentPokemon}) =>{
    return (
        <div>
            {currentPokemon[0] ? (
                <div className={style.container}>
                {currentPokemon?.map((poke)=>{
                    return (
                        <Card
                        key = {poke.id}
                        id = {poke.id}
                        name = {poke.name}
                        image = {poke.image}
                        hp = {poke.hp}
                        attack = {poke.attack}
                        defense = {poke.defense}    
                        types = {poke.types.map((type)=>type.name)}
                        />
                    );
                })}
                </div>
            ) : (
                <div>
                    <img src="https://media.tenor.com/fCvghb3z3MEAAAAj/pokemon-pikachu.gif" alt="" />
                    <h3 className={style.loading}>Loading...</h3>
                </div>
            )}
        </div>
    )
}

export default CardsContainer;