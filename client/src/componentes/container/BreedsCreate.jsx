import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { postBreeds, getTemperament } from '../../Redux/Actions/index.js';
import { useDispatch, useSelector } from 'react-redux';
import form from '../../styles/Formulario.module.css'
import house from '../../images/house_home.png'

const expreR = {
    name: /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/,
}

function validate(input) {
    let errors = [];
    const reg = new RegExp('^[0-9]+$')

    if (!input.name) {
        errors.name = "Este campo es requerido"
    } else if (!expreR.name.test(input.name)) {
        errors.name = 'Solo debe contener letras'
    }
    if (!input.weight_max) {
        errors.weight_max = "Este campo es requerido"
    }
    else if (!reg.test(input.weight_max)) {
        errors.weight_max = "Solo debe contener numeros"
    }
    if (!input.weight_min) {
        errors.weight_min = "Este campo es requerido"
    }
    else if (!reg.test(input.weight_min)) {
        errors.weight_min = "Solo debe contener numeros"
    }
    if (input.weight_max && input.weight_min && Number(input.weight_min) >= Number(input.weight_max)) {
        errors.weight_max = "El peso mínimo no puede ser superior o igual al peso máximo"
    }
    if (!input.height_max) {
        errors.height_max = "Este campo es requerido"
    } else if (!reg.test(input.height_max)) {
        errors.height_max = "Este campo solo debe contener numeros"
    }
    if (!input.height_min) {
        errors.height_min = "Este campo es requerido"
    } else if (!reg.test(input.height_min)) {
        errors.height_min = "Este campo solo debe contener numeros"
    }
    if (input.height_max && input.height_min && Number(input.height_min) >= Number(input.height_max)) {
        errors.height_max = "El peso mínimo no puede ser superior o igual al peso máximo";
    }
    if(!reg.test(input.life_span_min)){
        errors.life_span_min= "Este campo solo debe contener numeros"
    }
    if(!reg.test(input.life_span_max)){
        errors.life_span_max= "Este campo solo debe contener numeros"
    }
    if(input.life_span_max && input.life_span_min && Number(input.life_span_min) >= Number(input.life_span_max)) {
        errors.life_span_max = "El peso mínimo no puede ser superior o igual al peso máximo"
    }
    return errors;
}


export default function BreedsCreate() {
    const dispatch = useDispatch();
    const history = useHistory()
    const temperaments = useSelector((state) => state.temperaments)
    const [errores, setErrors] = useState({})
    const [input, setInput] = useState({
        name: "",
        weight_max: '',
        weight_min: '',
        height_max: '',
        height_min: '',
        life_span_max: '',
        life_span_min: '',
        image: "",
        temperament: [],

    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }
    function handleSelector(e) {
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
    if(!Object.keys(errores).length ){
        let temp = temperaments.filter(t => input.temperament.includes(t.name))
        temp = temp.map(t => t.id)
        const postFinal = {
            name: input.name,
            weight: [Number(input.weight_min), Number(input.weight_max)],
            height: [Number(input.height_min), Number(input.height_max)],
            life_span: [Number(input.life_span_min), Number(input.life_span_max)],
            image: input.image,
            temperament: temp
        }
        
        dispatch(postBreeds(postFinal))
        setInput({
            name: "",
            weight_max: '',
            weight_min: '',
            height_max: '',
            height_min: '',
            life_span_max: '',
            life_span_min: '',
            image: '',
            temperament: []
        })
        history.push('/home')}
    }

    function handleDelete(el) {
        setInput({
            ...input,
            temperament: input.temperament.filter(t => t !== el)//manejador del boton X de temperament
        })
    }

    useEffect(() => {
        dispatch(getTemperament());
    }, [dispatch]);
    return (
        <div className={form.black}>
        <div className={form.body}>
        <Link to='/home'><button className={form.btn} >
               <img className={form.img} src={house} alt="no se encontro imagen"/>
            </button></Link>
        <h1>Crea tu personaje</h1>
        <form className={form.container} onSubmit={(e) => handleSubmit(e)}>
            <div >
                <label>Nombre : </label>
                <input
                    className={form.textLine}
                    type='text'
                    pattern="^[a-zA-Z\s]+{2,254}"
                    value={input.name}
                    required
                    name='name'
                    onChange={(e) => handleChange(e)}
                />
                {errores.name && (
                    <p className={form.formulario_incorrecto}>{errores.name}</p>
                )}
            </div>
            <h4>Altura</h4>
            <div className={form.textLine}>
                <label>min : </label>
                <input
                    className={form.textLine}
                    value={input.height_min}
                    type="number"
                    required
                    name='height_min'
                    onChange={(e) => handleChange(e)}
                />
                {errores.height_min && (
                    <p className={form.formulario_incorrecto}>{errores.height_min}</p>
                )}
            </div>
            <div className={form.textLine}>
                <label> max : </label>
                <input
                    className={form.textLine}
                    value={input.height_max}
                    type="number"
                    required
                    name='height_max'
                    onChange={(e) => handleChange(e)}
                />
                {errores.height_max && (
                    <p className={form.formulario_incorrecto}>{errores.height_max}</p>
                )}
            </div>
            <h4>Peso</h4>
            <div className={form.textLine}>
                <label> min : </label>
                <input
                    className={form.textLine}
                    value={input.weight_min}
                    type="number"
                    required
                    name='weight_min'
                    onChange={(e) => handleChange(e)}
                />
                {errores.weight_min && (
                    <p className={form.formulario_incorrecto}>{errores.weight_min}</p>
                )}
            </div>
            <div className={form.textLine}>
                <label> max : </label>
                <input
                    className={form.textLine}
                    value={input.weight_max}
                    type="number"
                    required
                    name='weight_max'
                    onChange={(e) => handleChange(e)}
                />
                {errores.weight_max && (
                    <p className={form.formulario_incorrecto}>{errores.weight_max}</p>
                )}
            </div>
            <h4>Esperanza de vida</h4>
            <div className={form.textLine}>
                <label> min : </label>
                <input
                    className={form.textLine}
                    type="number"
                    value={input.life_span_min}
                    name='life_span_min'
                    onChange={(e) => handleChange(e)}
                />
                {errores.life_span_min && (
                    <p className={form.formulario_incorrecto}>{errores.life_span_min}</p>
                )}
            </div>
            <div className={form.textLine}>
                <label> max : </label>
                <input
                    className={form.textLine}
                    type="number"
                    value={input.life_span_max}
                    name='life_span_max'
                    onChange={(e) => handleChange(e)}
                />{errores.life_span_max && (
                    <p className={form.formulario_incorrecto}>{errores.life_span_max}</p>
                )}
            </div>
            <div className={form.textLine} >
                <label>Imagen :</label>
                <input
                    className={form.textLine}
                    type="text"
                    placeholder="url.."
                    value={input.image}
                    name='image'
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <h4>Temperamento</h4>
            <select onChange={(e) => handleSelector(e)} className={form.textLine}>
                {temperaments.map((t) => {
                    return (
                        <option value={t.name} key={t.id}>{t.name}</option>
                    )
                })}
            </select>
            <div>
                {input.temperament.map((el, i) =>
                    <div className="divTem" key={i + 1}>
                        
                        <button className={form.btn_tmp} type="button" onClick={() => handleDelete(el)}  ><p className={form.p}>{el}</p></button>
                    </div>
                )}
            </div>
                <div>
                <button className={form.button} >
                        <span className={form.button.text}>Crear</span>
                        
                    </button>
                </div>

            </form>
        </div>
        </div>
    )
}