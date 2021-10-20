import React, { useState } from 'react';
import './Button.styles.css';

const Button = props => {

    return(
        <div>
            <button onClick={props.onClick} className="btn">{props.text}</button>
        </div>
    );
}
export default Button;