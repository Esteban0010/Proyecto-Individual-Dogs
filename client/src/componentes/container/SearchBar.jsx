import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDogs } from "../../Redux/Actions";
import s from '../../styles/searchBar.css'


export default function SearchBar (){
    const dispatch = useDispatch();
    const [name,setName] = useState('');

    function handleImputChange(e){
       setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameDogs(name))
        setName("")
    }

    return(
        <div >
            <input
            value={name}
            type = 'text'
            placeholder="Buscar..."
            onChange={(e) =>handleImputChange(e)}
            />
            <button  type="submit" onClick={(e)=> handleSubmit(e)} className={s.btn}>Buscar</button>
        </div>
    )
}