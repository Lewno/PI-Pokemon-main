import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getTypes, postPokemon } from "../../redux/actions";
import { Link, useNavigate } from "react-router-dom";
import validate from "./validate";

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
        "types":""
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
        setInput({
            ...input,
            types:[...input.types, event.target.value]
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
    console.log(errors);
    console.log(input);


    return (
        <div>
            <Link to="/home"><button>Volver</button></Link>
            <h1>Crea tu pokemon</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input 
                    type="text" 
                    value={input.name} 
                    name="name" 
                    onChange={handleChange}
                    minLength="5" 
                    maxLength="15" 
                    required
                    />
                    <span>{errors.name}</span>
                </div>
                <div>
                    <label>Imagen:</label>
                    <input 
                    type="text" 
                    value={input.image} 
                    name="image" 
                    onChange={handleChange}
                    required
                    />
                    <span>{errors.image}</span>
                </div>
                <div>
                    <label>Vida:</label>
                    <input 
                    type="range" 
                    min="1" 
                    max="200"
                    value={input.hp} 
                    name="hp"
                    required 
                    onChange={handleChange}/>
                    <span>{input.hp}</span>
                </div>
                <div>
                    <label>Ataque:</label>
                    <input 
                    type="range" 
                    min="0" 
                    max="200"
                    value={input.attack} 
                    name="attack" 
                    required
                    onChange={handleChange}/>
                    <span>{input.attack}</span>
                </div>
                <div>
                    <label>Defensa:</label>
                    <input 
                    type="range" 
                    min="0" 
                    max="200"
                    value={input.defense} 
                    name="defense" 
                    required
                    onChange={handleChange}/>
                    <span>{input.defense}</span>
                </div>
                <div>
                    <label>Velocidad:</label>
                    <input 
                    type="range" 
                    value={input.speed} 
                    name="speed" 
                    onChange={handleChange}/>
                    <span>{input.speed}</span>
                </div>
                <div>
                    <label>Peso:</label>
                    <input 
                    type="number" 
                    value={input.weight} 
                    name="weight" 
                    onChange={handleChange}/>
                    <span>{input.weight}</span>
                </div>
                <div>
                    <label>Altura:</label>
                    <input 
                    type="number" 
                    value={input.height} 
                    name="height" 
                    onChange={handleChange}/>
                     <span>{input.height}</span>
                </div>
                <select onChange={handleSelect} value="all">
                    <option value="all" disabled>Types</option>
                    {types?.map((type) => <option key={type.name} value={type.name}>{type.name}</option>)}
                </select>
                <span>{errors.types}</span>

                <ul>{input.types.map((type)=> <li key={type}>{type}</li>)}</ul>

                <button type="submit" disabled={!input.types.length}>Crear</button>
            </form>
        </div>
    )
}

export default Form;