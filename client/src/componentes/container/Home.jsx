import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { filterbreedsByTemperament, getDogs,filterCreated, orderByName } from '../../Redux/Actions/index.js'
import { Link } from 'react-router-dom'
import Card from "../dumbs/Card.jsx";
import Paginado from "./paginado.jsx";
import SearchBar from "./SearchBar.jsx";

export default function Home() {
    const dispatch = useDispatch()
    const allRazes = useSelector((state) => state.dogs);
    const [orden, setOrden]=useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, setDogsPerpage] = useState(8);
    const indexLastDog = currentPage * dogsPerPage;// dogs en la posicion 8
    const indexOfFirstDog = indexLastDog - dogsPerPage;// dog en la posicion 0
    const currentDogs = allRazes.slice(indexOfFirstDog, indexLastDog);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }



    useEffect(() => {
        dispatch(getDogs());

    }, [dispatch])

    function handleClick(e) {
        e.preventDefault();//esta funcion me permite resetear la busqueda de razas
        dispatch(getDogs());
    }

    function handleSort (e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleFilterCreate(e){
        dispatch(filterCreated(e.target.value))
    }

    return (
        <div>
            <Link to='/dogs'>Crear Raza</Link>
            <h1> Pagina de  Perros</h1>
            <button onClick={e => { handleClick(e) }}>
                recargar Razas
            </button>
            <div>
                <select onChange={e => handleSort(e)}>
                    <option value='asc'>A-Z</option>
                    <option value='desc'>Z-A</option>
                </select>
                <select>
                    <option value='min'>Ascendente_Peso</option>
                    <option value='max'>Descendente_Peso</option>
                </select>
                <select onChange={e => handleFilterCreate(e)}>
                    <option value='all'>Todos</option>
                    <option value='created'>Creados</option>
                    <option value='api'>Existente</option>
                </select>
                <Paginado
                    dogsPerPage={dogsPerPage}
                    allRazes={allRazes}
                    paginado={paginado}
                />
                <SearchBar/>
                {currentDogs?.map((el) => {//mapeamos los dogs actuales
                    return (
                 <div className='cartas'>
                    <Link to={"/home/" + el.id}>
                    <Card name={el.name} image={el.image} temperaments={el.temperaments} weight={el.weight} weight_min={el.weight_min} weight_max={el.weight_max} key={el.id} />
                    </Link>
                </div>)
                })}
                <Paginado
                    dogsPerPage={dogsPerPage}
                    allRazes={allRazes}
                    paginado={paginado}
                />
            </div>
        </div>
    )
};

