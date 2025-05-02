'use client';

import React from 'react';

type GameMenuProps = {
    result: string | null;
    onContinueClick: () => void;
    onRestartClick: () => void;
    onMenuClick: () => void;
};

export default function GameMenu(props: GameMenuProps) {
    return (
        <div className="game-menu">
            { props.result !== null && (
                <h2 className={props.result === 'win' ? "win-message" : "lose-message"}>YOU {props.result.toUpperCase()}!</h2>
            )}
            <h3>MENU</h3>
            { props.result === null && (
            <button id="continue-button" onClick={props.onContinueClick}>CONTINUE</button>
            )}
            <button id="restart-button" onClick={props.onRestartClick}>RESTART</button>
            <button id="main-menu-button" onClick={props.onMenuClick}>MAIN MENU</button>
        </div>
    );
}