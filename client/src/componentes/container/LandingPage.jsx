import React from "react";
import {Link} from 'react-router-dom';
import s from '../../styles/LandingPage.module.css'
import imgg from '../../images/huellaaa.jpg'
import Dogimg from "../../images/cardDog.png"


export default function LandingPage(){
    return(
        <div className={s.lpg}>
            <div className={s.conteiner}>
            <div className={s.cartel}>
            
            <h1 className={s.Title}><strong>Bienvenido  a BookDog</strong></h1>
            <hr className={s.linea}></hr>
            <h1>Encontra aca toda la info que necesitas sobre tu mejor amigo peludo.</h1>
            <div className={s.containerbtn}>
            <Link to='/home'>
                <button className={s.buttonn}><img  className={s.img} src={imgg}alt="no se encontro img"/>
                <h1>Ingresar</h1></button>
            </Link>
            </div>
            </div>
            <div className={s.conteinerimg}>
                <img className={s.dogCard} src={Dogimg} alt="no hay img" />
            </div>
            </div>
        </div>
    )
}