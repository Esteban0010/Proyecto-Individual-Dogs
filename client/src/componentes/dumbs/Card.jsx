import React from "react";
import { Link } from "react-router-dom";
import s from '../../styles/Card.module.css'


export default function Card({ name, image, temperaments, weight, id }) {
    weight = weight[0] + " - " + weight[1]
    let arr=[];
    return (
        <div className={s.card}>
            <Link to={`/home/${id}`}>
        <button className={s.buttonn}>
            <h4>{name}</h4>
            <h4 className={s.card_home_h4}>Peso</h4>
            <p className={s.card_home_p}>{weight}</p>
            {
            temperaments.map((t) => {
                if(arr.length <3){
                if (t.name ) {
                     arr.push(t.name + " , ")
                }else {
                   arr.push(t+" , ")
               }
               if(t.name && arr.length === 3){
                arr.push(" ... ")
            }else if(!t.name && arr.length === 3){
                arr.push("... ")
            }
            }}
            )}
            <p className={s.card_home_p}>{arr}</p>
            <img className={s.card_home_img} src={image} alt="sin imgen" />
            </button>
            </Link>
        </div>
    )
}