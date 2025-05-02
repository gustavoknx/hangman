import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  // Extraindo os dados dos cookies
  const cookieStore = await cookies();
  const username = cookieStore.get('username')?.value;

  // Validando campos obrigatórios
  if (!username) {
    console.log('user inexistente');
    return NextResponse.json(
      { message: 'Usuário inexistente' },
      { status: 400 }
    );
  }

  try {
    // Verificando se o usuário existe
    const connectionPool = require('../../../../db');
    const exists = await connectionPool.query(`SELECT score FROM users WHERE username=$1`, [username]);
    
    if (exists.rowCount === 0) {
      return NextResponse.json(
        { message: 'Usuário inexistente' },
        { status: 400 }
      );
    } else {
      return NextResponse.json({
        success: true,
        username: username,
        score: exists.rows[0].score
      });
    }
  } catch (error) {
    // Tratando erros
    console.error('Erro ao buscar usuario:', error);
    return NextResponse.json(
      { message: 'Erro ao buscar usuário.' },
      { status: 500 }
    );
  }
}