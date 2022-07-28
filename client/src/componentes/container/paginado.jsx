import React from "react";

import s from '../../styles/Paginado.module.css'

export default function Paginado({ dogsPerPage, allRazes, paginado }) {//declaro mi pagiando y traigo mis propiedades de otro componente Home
    const pageNumbers = []//voy a almacenar la cantidad de paginas que necesito
    for (let i = 0; i < Math.ceil(allRazes.length / dogsPerPage); i++) {//math.cell va a redondear todos mis personajes,sobre la cantidad de pj que quiero por page
        pageNumbers.push(i + 1) // vamos a dividir todas las razes X la cantidad que quiero por pagina y lo voy a pushear
    }
    return (
        <nav >
            <ul className="paginado">
                {pageNumbers &&
                pageNumbers.map(number => {//devolvemos cada uno de los rumeros que tiene el paginado
                return <div className={s.Pgdo} key={number}>
                            <button onClick={() => paginado(number)} className={s.button_pag} >{number}</button>
                      </div>
                    })}
            </ul>
        </nav>
    )
}