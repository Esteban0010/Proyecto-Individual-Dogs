import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDeatail } from "../../Redux/Actions";
import { useEffect } from "react";

export function Detail(p) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDeatail(p.match.params.id))
    }, [dispatch])

    const myBreeds = useSelector((state) => state.detail)
    return (
        <div>
            {
                myBreeds.length > 0 ?
                    <div><h1>Raza {myBreeds[0].name}</h1>
                        <img src={myBreeds[0].img ? myBreeds[0].img : myBreeds[0].image} alt="" width="500px" hight="700px" />
                        <p>Height:{myBreeds[0].height}</p>
                        <p>Weight:{myBreeds[0].weight}</p>
                        <p>Life_span: {myBreeds[0].life_span}</p>
                        <h4>Temperament: {myBreeds[0].createdInDb ? myBreeds[0].temperament + " " : myBreeds[0].temperament.map(el => el.name + (" "))}</h4>
                    </div> : <p>Loading...</p>
            }
            <Link to='/home'>
                <button>volver</button>
            </Link>

        </div>
    )
}