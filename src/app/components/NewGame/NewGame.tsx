'use client';

import React, { useEffect, useState } from 'react';
import { Game, User } from '@/app/types/types';
import GameMenu from './GameMenu/GameMenu';
import PlayerStats from './PlayerStats/PlayerStats';
import GameStats from './GameStats/GameStats';
import Man from './Man/Man';
import Attempts from './Attempts/Attempts';
import { retrieveWord } from '@/app/db/game';
import Keyboard from './Keyboard/Keyboard';

type NewGameProps = {
    user: User;
    setMenuOption: () => void;
};

export default function NewGame(props: NewGameProps) {
    const [option, setOption] = useState<'play' | 'game-menu' | null>(null);
    const [game, setGame] = useState<Game>();
    const [result, setResult] = useState<'win' | 'lose' | null>(null);

    useEffect(() => {
        const initGame = async () => {
            const newGame: Game = {
                user: props.user,
                score: 0,
                word: await retrieveWord(),
                attempts: ""
            };
            setGame(newGame);
            setOption('play');
        };

        if (option === null){
            initGame();
        }
    }, [option]);

    useEffect(() => {
        const updateScore = async () => {
            if (game)
            {
                let correctPoints = 0;
                let wrongPoints = 0;
                let wrong = "";
                let anyCharLeft = false;
                
                for (var char of game.attempts){
                    if (game.word.includes(char)){
                        correctPoints += 10;
                    } else {
                        if (!wrong.includes(char)){
                            wrong += char;
                            wrongPoints += 2;
                        }
                    }
                }
                
                for (var char of game.word){
                    if (!game.attempts.includes(char)){
                        anyCharLeft = true;
                    }
                }

                game.score = correctPoints - wrongPoints;

                if (!anyCharLeft){
                    setResult('win');
                } else if (game.attempts.length === 7) {
                    setResult('lose');
                }
            }
        };
        updateScore();
    }, [game]);

    return (
        <div className="new-game">
            <PlayerStats user={props.user}/>
            <GameStats game={game} onMenuClick={() => setOption('game-menu')}/>
            <Man attempts={game ? game.attempts.length : 0}/>
            <Attempts word={game ? game.word : ""} attempts={game ? game.attempts : ""}/>
            { option === 'game-menu' || result != null && (
                <GameMenu result={result} onContinueClick={() => setOption('play')} onMenuClick={() => setOption('game-menu')} onRestartClick={() => setOption(null)}/>
            )}
            { option === 'play' && (
                <Keyboard result={result} attempts={game ? game.attempts : ""}/>
            )}
        </div>
    );
}