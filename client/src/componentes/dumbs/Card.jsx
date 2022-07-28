import React from "react";
import { Link } from "react-router-dom";
import card from '../../styles/Card.module.css'


export default function Card({ name, image, temperaments, weight, id }) {
    weight = weight[0] + " - " + weight[1]
    let arr=[];
    return (
        <div className={card.bg_Card}>
            <h3>{name}</h3>
            <h4>{weight}</h4>
            {
            temperaments.map((t) => {
                if(arr.length <3){
                if (t.name ) {
                     arr.push(t.name + " , ")
                }else {
                   arr.push(t+" , ")
               }
            }}
            )}
            <h5>{arr}</h5>
            <img src={image} alt="sin imgen" width='200px' height='200px' />
            <Link to={`/home/${id}`}>
                <button>Details</button>
            </Link>
        </div>
    )
}