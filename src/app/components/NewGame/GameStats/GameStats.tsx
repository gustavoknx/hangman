'use client';

import React from 'react';
import { Game } from '@/app/types/types';

type GameStatsProps = {
    game?: Game;
    onMenuClick: () => void;
};

export default function GameStats(props: GameStatsProps) {
    return (
        <div className="game-stats">
            <div className="game-menu-button">
                <button onClick={props.onMenuClick}>MENU</button>
            </div>
            <div className="game-score">
                <h3>Score: {props.game ? props.game?.score : 0}</h3>
            </div>
        </div>
    );
}