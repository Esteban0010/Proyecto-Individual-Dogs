import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../Redux/Actions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import s from "../../styles/Card.module.css"
import fondo from "../../styles/cardFondo.module.css"

export default function Detail() {
    const { id } = useParams()
    console.log(id)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch])

    const myBreeds = useSelector((state) => state.detail)
 let arr=[]
    return (
        <div className={fondo.ff}>
            {
                myBreeds.length > 0 ?
                    <div className={s.card}>
                        <h1 className={s.card_home_h4}>Raza {myBreeds[0].name}</h1>
                        <img className={s.card_home_img} src={myBreeds[0].img ? myBreeds[0].img : myBreeds[0].image} alt="" width="500px" hight="700px" />
                        <p className={s.card_home_h4}>Altura:{`${myBreeds[0].height[0]} - ${myBreeds[0].height[1]} cm`}</p>
                        <p className={s.card_home_h4}>Peso:{`${myBreeds[0].height[0]} - ${myBreeds[0].height[1]} Kg`}</p>
                        <p className={s.card_home_h4}>Esperanza de vida: {` de ${myBreeds[0].life_span[0]} a ${myBreeds[0].life_span[1]} años `}</p>
                        {myBreeds[0].temperaments.map((t) => {
                                    if (t.name) {
                                        arr.push(t.name + " , ")
                                    } else {
                                        arr.push(t + " , ")
                                    }
                                })}
                        <p className={s.card_home_p}>{"Temperamentos : "+arr}</p>

                    </div> : <p>Loading...</p>
            }
            <Link to='/home'>
                <button>volver</button>
            </Link>

        </div>

    )
}