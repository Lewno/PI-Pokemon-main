import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getTypes, postPokemon } from "../../redux/actions";
import { Link, useNavigate } from "react-router-dom";
import validate from "./validate";
import style from "./Form.module.css";
import typeColor from "../../Help/help";

const Form = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const types = useSelector((state)=>state.types);


    const [input, setInput] = useState({
        "name":"",
        "hp": 0,
        "image":"",
        "attack": 0,
        "defense": 0,
        "speed": 0,
        "height": 0,
        "weight":0,
        "types":[]
    });

    const [errors, setErrors] = useState({
        "name":"",
        "hp": 0,
        "image":"",
        "attack": 0,
        "defense": 0,
        "types":[]
    });
    
    useEffect(()=>{
        dispatch(getTypes())
    },[dispatch]);

    const handleChange = (event) =>{
        setInput({
            ...input,
            [event.target.name] : event.target.value
        })
        setErrors(validate({
            ...input,
            [event.target.name] : event.target.value
        },errors));
    }

    const handleSelect = (event) =>{
        if(!input.types.find((element)=> element === event.target.value)){
            if(input.types.length <2){
                setInput({
                    ...input,
                    types:[...input.types, event.target.value]
                })
            }
        }
        

    }

    const handleDelete = (type) =>{
        setInput({
            ...input,
            types: input.types.filter((t)=> t!== type)
        })
    }


    const handleSubmit = (event) =>{
        event.preventDefault();
            dispatch(postPokemon(input));
            alert("Pokemon creado");
            setInput({
                "name":"",
                "hp": 0,
                "image":"",
                "attack": 0,
                "defense": 0,
                "speed": 0,
                "height": 0,
                "weight":0,
                "types":[]
            })
            navigate("/home");
    }


    const disabledTrue = () => {
        return !input.types.length || !input.name || !input.image;
    }

    return (
        <div className={style.page}>
            <Link to="/home"><button className={style.back}></button></Link>
            <div className={style.form}>
                <h1>Crea tu pokemon</h1>
                <form onSubmit={handleSubmit}>
                <div className={style.containerLine}>
                    <label className={style.labelLine}>Nombre:</label>
                    <input 
                    className={style.inputLine} 
                    type="text" 
                    value={input.name} 
                    name="name" 
                    onChange={handleChange}
                    minLength="5" 
                    maxLength="30" 
                    required
                    />
                    <span>{errors.name}</span>
                </div>
                <div className={style.containerLine}>
                    <label className={style.labelLine}>Imagen:</label>
                    <input 
                    className={style.inputLine} 
                    type="text" 
                    value={input.image} 
                    name="image" 
                    onChange={handleChange}
                    required
                    />
                    <span>{errors.image}</span>
                </div>
                <div className={style.containerLine}>
                    <label className={style.labelLine}>Vida:</label>
                    <input 
                    className={style.inputLine} 
                    type="range" 
                    min="1" 
                    max="200"
                    value={input.hp} 
                    name="hp"
                    required 
                    onChange={handleChange}/>
                    <span>{input.hp}</span>
                </div>
                <div className={style.containerLine}>
                    <label className={style.labelLine}>Ataque:</label>
                    <input 
                    className={style.inputLine} 
                    type="range" 
                    min="0" 
                    max="200"
                    value={input.attack} 
                    name="attack" 
                    required
                    onChange={handleChange}/>
                    <span>{input.attack}</span>
                </div>
                <div className={style.containerLine}>
                    <label className={style.labelLine}>Defensa:</label>
                    <input 
                    className={style.inputLine} 
                    type="range" 
                    min="0" 
                    max="200"
                    value={input.defense} 
                    name="defense" 
                    required
                    onChange={handleChange}/>
                    <span>{input.defense}</span>
                </div>
                <div className={style.containerLine}>
                    <label className={style.labelLine}>Velocidad:</label>
                    <input 
                    className={style.inputLine} 
                    type="range" 
                    min="0" 
                    max="200"
                    value={input.speed} 
                    name="speed" 
                    onChange={handleChange}/>
                    <span>{input.speed}</span>
                </div>
                <div className={style.containerLine}>
                    <label className={style.labelLine}>Peso:</label>
                    <input 
                    className={style.inputLine} 
                    type="number" 
                    value={input.weight} 
                    name="weight" 
                    onChange={handleChange}/>
                </div>
                <div className={style.containerLine}>
                    <label className={style.labelLine}>Altura:</label>
                    <input 
                    className={style.inputLine} 
                    type="number" 
                    value={input.height} 
                    name="height" 
                    onChange={handleChange}/>
                </div>
                <div className={style.typeContainer}>
                    <select onChange={handleSelect} value="all">
                        <option value="all" disabled>Types</option>
                        {types?.map((type) => <option key={type.name} value={type.name}>{type.name}</option>)}
                    </select>
                    <span>{errors.types}</span>

                    <div>
                        {input.types.map((type)=> 
                            <div className={style.types} key={type}>
                                <span style={{background:typeColor[type]}}>{type}</span>
                                <button className={style.delete} onClick={()=>handleDelete(type)}>X</button>
                            </div>
                        )}
                    </div>
                </div>

                <button className={style.buttonForm} type="submit" disabled={disabledTrue()}>Crear</button>
                </form>
            </div>
        </div>
    )
}

export default Form;