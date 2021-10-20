import React, { useState } from 'react';
import './Card.styles.css';
import { BsSearch } from 'react-icons/bs';


const Card = props => {

    return(
        <div className="card">
            <div className="cardContentWrapper">
                <h1>{props.titleText}</h1>
            </div>
            <img src={props.image} />
                <p>{props.bodyText}</p>
        </div>
    );
}
export default Card;