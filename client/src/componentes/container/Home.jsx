import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getDogs, filterCreated, orderByName, orderByWeight, filterByTemperament, getTemperament } from '../../Redux/Actions/index.js'
import { Link } from 'react-router-dom'
import Card from "../dumbs/Card.jsx";
import Paginado from "./paginado.jsx";
import SearchBar from "./SearchBar.jsx";
import home from "../../styles/home.module.css"

export default function Home() {
    const dispatch = useDispatch()
    const allRazes = useSelector((state) => state.dogs);
    const [orden, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, setDogsPerpage] = useState(8);
    const indexLastDog = currentPage * dogsPerPage;// dogs en la posicion 8
    const indexOfFirstDog = indexLastDog - dogsPerPage;// dog en la posicion 0
    const currentDogs = allRazes.slice(indexOfFirstDog, indexLastDog);
    const temperaments = useSelector((state) => state.temperaments)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getTemperament());
    }, [dispatch])



    useEffect(() => {
        dispatch(getDogs());
    }, [dispatch])

    function handleClick(e) {
        e.preventDefault();//esta funcion me permite resetear la busqueda de razas
        dispatch(getDogs());
    }
    function handleSortW(e) {
        e.preventDefault();
        dispatch(orderByWeight(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleSort(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }


    function handleFilterCreate(e) {
        dispatch(filterCreated(e.target.value))
    }

    function handleFilterTemps(e) {
        dispatch(filterByTemperament(e.target.value))
    }

    return (
        <div className={home.fondo}>
            
            <h1 className={home.title}> Pagina de  Perros</h1>
            <Link to='/dogs'><button> Crear Razas</button></Link>
            <button onClick={e => { handleClick(e) }}>
                recargar Razas
            </button>
            <div>
                <div>
                <SearchBar />
                <select onChange={e => handleSort(e)}>
                    <option value='espacio'>Ordenar Alfabeticamente</option>
                    <option value='asc'>A-Z</option>
                    <option value='desc'>Z-A</option>
                </select>
                <select onChange={(e) => handleSortW(e)}>
                    <option value='espacio'>Ordenar por peso</option>
                    <option value='min'>Ascendente_Peso</option>
                    <option value='max'>Descendente_Peso</option>
                </select>
                <select onChange={e => handleFilterCreate(e)}>
                    <option value='all'>Todos</option>
                    <option value='created'>Creados</option>
                    <option value='api'>Existente</option>
                </select>
                <select onChange={e => handleFilterTemps(e)}>
                    <option value='All'>Todos</option>
                    {temperaments.length ? temperaments.map((t) => {
                        return (
                            <option value={t.name} key={t.id}>{t.name}</option>
                        )
                    }) : []}
                </select>
                </div>
                <div >
                <Paginado
                    dogsPerPage={dogsPerPage}
                    allRazes={allRazes}
                    paginado={paginado}
                />
            </div>
                <div>
                {currentDogs?.map((el) => {//mapeamos los dogs actuales
                    let img_default = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpogKEZyKYIizvvf6d7Zm9FIPLBgh70foYpg&usqp=CAU'
                    return (
                        <div className={home.card_home} key={el.id}>
                            <Link to={"/home/" + el.id} key={el.id}>
                                <Card name={el.name} image={el.image ? el.image : img_default} temperaments={el.temperaments} weight={el.weight} key={el.id} id={el.id} />
                            </Link>
                        </div>)
                })}
                </div>
                <div>
                <Paginado
                    dogsPerPage={dogsPerPage}
                    allRazes={allRazes}
                    paginado={paginado}
                />
            </div>
            </div>
        </div>
    )
};

