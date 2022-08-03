import React from "react";

import s from '../../styles/Paginado.module.css'

export default function Paginado({ dogsPerPage, allRazes, paginado}) {
    const pageNumbers = []
    for (let i = 0; i < Math.ceil(allRazes.length / dogsPerPage); i++) {
        pageNumbers.push(i + 1)
    }
    return (
            <ul className="paginado">
                {pageNumbers &&
                pageNumbers.map(number => {
                return <div className={s.Pgdo} key={number}>
                            <button onClick={() => paginado(number)} className={s.button_pag} >{number}</button>
                      </div>
                    })}
            </ul>
    )
}