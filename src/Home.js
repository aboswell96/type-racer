import React, { useState } from 'react';
import './Home.css';
import TypeRacerGame from './TypeRacerGame.js';
import RaceMenuCard from './RaceMenuCard.js';
import computerGraphic from './res/img/keyboard_cartoon.jpg';

const GAMEMODES = {
    NONE:"none",
    PRACTICE:"practice",
    BOTS:"bots",
}

const Home = () => {

    const [gameMode,SetGameMode] = useState(GAMEMODES.NONE);

    return(
        <div>
            {renderTypeRacerMode(gameMode, SetGameMode)}
        </div>
    );
}

const TypeRacerMenu = (props) => {
    return (
        <div class="typeracer__menu__widget">
            <RaceMenuCard
                img={computerGraphic}
                alt_text={"multiplayer images"}
                text="Play against Bots"
                onClick={function(){props.OnClick(GAMEMODES.BOTS)}}
            />
            <RaceMenuCard
                img={computerGraphic}
                alt_text={"cartoon computer image"}
                text="Practice"
                onClick={function(){props.OnClick(GAMEMODES.PRACTICE)}}
            />
        </div>
    )
}

const renderTypeRacerMode = (mode, f) => {
    switch(mode) {
        case GAMEMODES.NONE:
            return(<TypeRacerMenu
                OnClick={f}
            />);
        case GAMEMODES.PRACTICE:
            return("practice");
        case GAMEMODES.BOTS:
            return(<TypeRacerGame/>);
        default:
            return(<TypeRacerMenu OnClick={f}/>);
    }
}


export default Home;