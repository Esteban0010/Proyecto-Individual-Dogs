import React from "react";
import {Link} from 'react-router-dom';
import s from '../../styles/LandingPage.module.css'

export default function LandingPage(){
    return(
        <div className={s.lpg}>
            <h1>Bienvenido  a DogRaze</h1>
            <Link to='/home'>
                <button>Ingresar</button>
            </Link>
        </div>
    )
}