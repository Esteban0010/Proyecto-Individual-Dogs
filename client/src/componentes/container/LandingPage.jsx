import React from "react";
import {Link} from 'react-router-dom';
import s from '../../styles/LandingPage.module.css'
import imgg from '../../images/huellaaa.jpg'


export default function LandingPage(){
    return(
        <div className={s.lpg}>
            <div className={s.cartel}>
            
            <h1>Bienvenido  a Breeds</h1>
            <h1>Encontra aca toda la info que necesitas sobre tu raza de perro favorita.</h1>
            <Link to='/home'>
                <button className={s.buttonn}><img  className={s.img} src={imgg}alt="no se encontro img"/>
                <h1>Ingresar</h1></button>
            </Link>
            </div>
        </div>
    )
}