'use client';

import React from 'react';
import { User } from '@/app/types/types';

type PlayerStatsProps = {
    user: User;
};

export default function PlayerStats(props: PlayerStatsProps) {
    return (
        <div className="player-stats">
            <h3>{props.user.username} ({props.user.score} points)</h3>
        </div>
    );
}