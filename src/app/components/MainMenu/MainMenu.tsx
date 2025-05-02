'use client';

import React, { useState } from 'react';
import NewGame from '../NewGame/NewGame';
import { User } from '@/app/types/types';
import Highscore from '../Highscore/Highscore';

type MainMenuProps = {
    user: User;
};

export default function MainMenu(props: MainMenuProps) {
    const [option, setOption] = useState<'game' | 'highscore' | null>(null);
    
    const onMenuClick = async () => {
        setOption(null);
    }

    return (
        <div className="main-menu">
            { option === null && (
                <div className="menu-options">
                    <button onClick={() => setOption('game')}>New Game</button>
                    <button onClick={() => setOption('highscore')}>Highscore</button>
                </div>
            )}
            { option === 'game' && (
                <NewGame user={props.user} setMenuOption={onMenuClick}/>
            )}
            { option === 'highscore' && (
                <Highscore user={props.user}/>
            )}
        </div>
    );
}