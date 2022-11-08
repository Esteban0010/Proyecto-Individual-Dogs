import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../Redux/Actions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import fondo from "../../styles/cardFondo.module.css"
import spinner from '../../images/Loading_2.gif'
import imgg from '../../images/images.png'



export default function Detail() {
    const [loading, setLoading] = useState(true);
    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
        dispatch(getDetail(id))
    }, [])

    let myBreeds = useSelector((state) => state.detail)
    let arr = []
    
    return (
       
            <div className={fondo.ff}>
                {loading
                    ? <div>
                        <img src={spinner} alt="Cargando..." className={fondo.spinner} />
                    </div>
                    :
                    myBreeds.length > 0 ? 
                        <div className={fondo.card}>
                            <h1 className={fondo.card_home_h4}>Raza: {myBreeds[0].name}</h1>
                            <img className={fondo.card_home_img} src={myBreeds[0].img ? myBreeds[0].img : myBreeds[0].image} alt="" width="500px" hight="700px" />
                            <p className={fondo.card_home_h4}>Altura:{`${myBreeds[0].height[0]} - ${myBreeds[0].height[1]} cm`}</p>
                            <p className={fondo.card_home_h4}>Peso:{`${myBreeds[0].height[0]} - ${myBreeds[0].height[1]} Kg`}</p>
                            <p className={fondo.card_home_h4}>Esperanza de vida: {` de ${myBreeds[0].life_span[0]} a ${myBreeds[0].life_span[1]} años `}</p>
                            {myBreeds[0].temperaments.map((t) => {
                                if (t.name) {
                                    arr.push(t.name + " ")
                                } else {
                                    arr.push(t + " ")
                                }
                            })}
                            <p className={fondo.card_home_p}>{"Temperamentos : " + arr}</p>

                        </div> : myBreeds.name ?  <div className={fondo.card}>
                            <h1 className={fondo.card_home_h4}>Raza: {myBreeds.name}</h1>
                            <img className={fondo.card_home_img} src={myBreeds.img ? myBreeds.img : imgg} alt="ho hay imagen" width="500px" hight="700px" />
                            <p className={fondo.card_home_h4}>Altura:{`${myBreeds.height[0]} - ${myBreeds.height[1]} cm`}</p>
                            <p className={fondo.card_home_h4}>Peso:{`${myBreeds.height[0]} - ${myBreeds.height[1]} Kg`}</p>
                            <p className={fondo.card_home_h4}>Esperanza de vida: {` de ${myBreeds.life_span[0]} a ${myBreeds.life_span[1]} años `}</p>
                            {myBreeds.temperaments.map((t) => {
                                if (t.name) {
                                    arr.push(t.name + " ")
                                } else {
                                    arr.push(t + " ")
                                }
                            })}
                            <p className={fondo.card_home_p}>{"Temperamentos : " + arr}</p>

                        </div> : <h1> Loading...</h1>
                }
                <Link to='/home'>
                    <button className={fondo.button}>volver</button>
                </Link>
            </div>
        
    )
}