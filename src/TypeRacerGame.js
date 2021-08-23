import React, { useState } from 'react';
import './TypeRacerGame.css';


const TypeRacerGame = () => {
    return(
        <div class="typeracer__game">
            <TypeRacerControlPanel/>
            <TypeRacerOptions/>
        </div>
        );
}

const TypeRacerControlPanel = () => {
    return (
        <ul class="flex__row">
            <li>
                <TypeRacerControlButton
                    displayString="Start"
                    style={{"background-color":"Green"}}
                    class="widget__button"
                />
                </li>
                <li>
                <TypeRacerControlButton
                    displayString="Stop"
                    style={{"background-color":"Red"}}
                />
                </li>
        </ul>
    );
}

const TypeRacerControlButton = (props) => {

    return(
        <button style={props.style} class="widget__button">{props.displayString}</button>
    );
}

const TypeRacerOptions = (props) => {
    return(
        <div>
            Options
        </div>
    );
}

export default TypeRacerGame;