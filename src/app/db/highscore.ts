'use server';

import { HighscorePlayer } from "@/app/types/types";

export async function getHighscore(): Promise<HighscorePlayer[] | null>{
    try {
        const connectionPool = require('../../../db');

        const ranking = await connectionPool.query(`
        SELECT username, position FROM (
            SELECT username, row_number() over (order by score) as position FROM users
        ) p WHERE position <= 10;
        `);

        const highscore: HighscorePlayer[] = ranking.recordset.map((result: any) => ({
            username: result.username,
            position: result.position
        }));

        return highscore;
    } catch (error) {
        // Tratando erros
        console.error('Erro ao consultar ranking:', error);
        return null;
    }
}

export async function getPlayerPosition(username: string): Promise<number>{
    try {
        const connectionPool = require('../../../db');
        connectionPool.parameters.add('username', username);
        const position = await connectionPool.query(`
        SELECT position FROM (
            SELECT username, row_number() over (order by score) as position FROM users
        ) p WHERE username=@usernname;
        `);
        return position.recordset[0].position;
    } catch (error) {
        // Tratando erros
        console.error('Erro ao buscar posicao do jogador:', error);
        return -1;
    }
}