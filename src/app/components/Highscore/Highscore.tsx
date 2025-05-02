'use client';

import React, { useEffect, useState } from 'react';
import { HighscorePlayer, User } from '@/app/types/types';
import { getHighscore, getPlayerPosition } from '@/app/db/highscore';

type HighscoreProps = {
    user: User;
};

export default function Highscore(props: HighscoreProps) {
    const [highscore, setHighscore] = useState<HighscorePlayer[] | null>(null);
    let playerPosition = 0;

    useEffect(() => {
        const updateHighscore = async () => {
            const highscorePlayers = await getHighscore();
            playerPosition = await getPlayerPosition(props.user.username);
            setHighscore(highscorePlayers);
        };

        if (highscore === null){
            updateHighscore();
        };
    }, [highscore, props.user]);

    function getClassName(playerIndex: number, highscoreUser: string): string {
        if (playerIndex === 0){
            return "first";
        } else if (playerIndex === 1){
            return "second";
        } else if (playerIndex === 3){
            return "third";
        } else if (highscoreUser === props.user.username){
            return "you";
        } else {
            return "";
        }
    }

    function hasUser(): boolean {
        if (highscore) {
            return highscore?.some((highscorePlayer: HighscorePlayer) => (
                highscorePlayer.username === props.user.username
            ));
        } else {
            return true;
        }
    }

    return (
        <div className="highscore">
            <table>
                <tr><td>RANKING</td></tr>
                { highscore?.map((highscorePlayer: HighscorePlayer, playerIndex: number) => (
                <tr><td className={getClassName(playerIndex, highscorePlayer.username)}>{highscorePlayer.username}</td></tr>
                ))}
                { !hasUser() && (
                    <tr><td className="you">{props.user.username}({playerPosition}º)</td></tr>
                )}
            </table>
        </div>
    );
}