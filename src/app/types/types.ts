export interface User
{
    username: string;
    score: number;
}

export interface Game
{
    user: User;
    score: number;
    word: string;
    attempts: string;
}

export interface HighscorePlayer
{
    username: string;
    position: number;
}