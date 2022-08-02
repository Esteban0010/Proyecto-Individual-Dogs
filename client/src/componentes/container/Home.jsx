import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getDogs, filterCreated, orderByName, orderByWeight, filterByTemperament, getTemperament } from '../../Redux/Actions/index.js'
import { Link } from 'react-router-dom'
import Card from "../dumbs/Card.jsx";
import Paginado from "./paginado.jsx";
import SearchBar from "./SearchBar.jsx";
import home from "../../styles/home.module.css"
import nav from '../../styles/NavBar.module.css'
import spinner from '../../images/Loading_2.gif'
import house from '../../images/house_home.png'
import no_encuentra from '../../images/no_encuentra.jpg'
export default function Home() {
    const dispatch = useDispatch()
    const allRazes = useSelector((state) => state.DogsFiltrados);
    const [, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, ] = useState(8);
    const indexLastDog = currentPage * dogsPerPage;// dogs en la posicion 8
    const indexOfFirstDog = indexLastDog - dogsPerPage;// dog en la posicion 0
    const currentDogs = allRazes.slice(indexOfFirstDog, indexLastDog);
    const temperaments = useSelector((state) => state.temperaments)
    const [loading, setLoading] = useState(true);
   

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getTemperament());
    }, [dispatch])



    useEffect(() => {
        dispatch(getDogs());
        setTimeout(() => {
            setLoading(false)
        }, 2000)
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
        setCurrentPage(1);
    }

    function handleFilterTemps(e) {
        dispatch(filterByTemperament(e.target.value))
        setCurrentPage(1);
    }




    return (
        <div className={home.fondo}>

            <h1 className={home.title}> Pagina de  Perros</h1>
            <div>
            <div className={nav.navBar}>
                <Link to='/'><button className={home.btnCreate}>Inicio</button></Link>
            <Link to='/dogs'><button className={home.btnCreate}>Crear Razas</button></Link>
            <button className={home.btn} onClick={e => { handleClick(e) }}>
               <img className={home.img} src={house} alt="no se encontro imagen"/>
            </button>
           
                <ul>
                <li className={nav.navBarLi}>
                    <SearchBar  />
                    </li>
                    <li className={nav.navBarLi}>
                    <select onChange={e => handleSort(e)} className={home.btnFilt}>
                        <option  value='espacio'>Ordenar Alfabeticamente</option>
                        <option  value='asc'>A-Z</option>
                        <option value='desc'>Z-A</option>
                    </select>
                    </li>
                    <li className={nav.navBarLi}>
                    <select onChange={(e) => handleSortW(e)} className={home.btnFilt}>
                        <option value='espacio'> peso</option>
                        <option value='min'>Ascendente_Peso</option>
                        <option value='max'>Descendente_Peso</option>
                    </select>
                    </li>
                    <li className={nav.navBarLi}>
                    <select onChange={e => handleFilterCreate(e)} className={home.btnFilt}>
                        <option value='all'>Todos</option>
                        <option value='created'>Creados</option>
                        <option value='api'>Existente</option>
                    </select>
                    </li>
                    <li className={nav.navBarLi}>
                    <select onChange={e => handleFilterTemps(e)} className={home.btnFilt}>
                        <option value='All'>Todos</option>
                        {temperaments.length ? temperaments.map((t) => {
                            return (
                                <option value={t.name} key={t.id}>{t.name}</option>
                            )
                        }) : []}
                    </select>
                    </li>
                    </ul>
                </div>
                <div className={home.paginacion} >
                    <Paginado
                     className={home.ajustePag}
                        dogsPerPage={dogsPerPage}
                        allRazes={allRazes}
                        paginado={paginado}
                    />
                </div>
                {loading
                    ? <div>
                        <img src={spinner} alt="Cargando..."  className={home.spinner}/>
                    </div>
                    : <div className={home.card_home}>
                        {currentDogs.length === 0 ? <div className={home.msj_no}><h1>No se encontraron Razas</h1>
                        <img  className={home.img_no} src={no_encuentra} alt="no hay img"/></div>
                            : currentDogs?.map((el) => {//mapeamos los dogs actuales
                                let img_default = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpogKEZyKYIizvvf6d7Zm9FIPLBgh70foYpg&usqp=CAU'
                                return (
                                    <div  key={el.id}>
                                    <Link to={"/home/" + el.id} key={el.id}>
                                    <Card name={el.name} image={el.image ? el.image : img_default} temperaments={el.temperaments} weight={el.weight} key={el.id} id={el.id} />
                                    </Link>
                                    </div>)
                            })}
                    </div>}
                <div className={home.ajustePag}>
                    <Paginado
                    className={home.ajustePag}
                        dogsPerPage={dogsPerPage}
                        allRazes={allRazes}
                        paginado={paginado}
                    />
                </div>
            </div>
        </div>
    )
};

