import React from "react";
import s from '../../styles/Card.module.css'


export default function Card({ name, image, temperaments, weight_min, weight_max ,weight}) {
    if(weight_max && weight_min){
     weight = `${weight_min} - ${weight_max}`}
    return (
        <div className={s.bg_Card}>
            <h3>{name}</h3>
            <h4>{weight}</h4>
            {temperaments.map((t) => {
                
                    if (t.name) {

                        return (
                            <h5>{t.name}</h5>
                        )
                    }
                    return (
                        <h5>{t}</h5>
                    )
                }
              )}
            <img src={image} alt="sin imgen" width='200px' height='200px' />
            <button>Detalles</button>
        </div>
    )
}