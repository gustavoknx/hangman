import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Definindo interfaces para tipagem
interface RegisterFormData {
  username: string;
}

export async function POST(req: NextRequest) {
  try {
    // Extraindo os dados do corpo da requisição
    const body = await req.json();
    const { username } = body as RegisterFormData;

    // Validando campos obrigatórios
    if (!username) {
      return NextResponse.json(
        { message: 'Dados incompletos' },
        { status: 400 }
      );
    }

    // Verificando se o usuário existe
    const connectionPool = await require('../../../../db');
    const encryptedUser = btoa(username);

    const exists = await connectionPool.query(`SELECT 1 FROM users WHERE username=$1`, [encryptedUser]);

    if (exists.rowCount === 1) {
      return NextResponse.json(
        { message: 'Usuário já existe' },
        { status: 400 }
      );
    } else {
      await connectionPool.query(`INSERT INTO users (username) VALUES ($1)`, [encryptedUser]);
      
      // Definindo cookie
      const cookieStore = await cookies()
      cookieStore.set('username', encryptedUser);
      
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    // Tratando erros
    console.error('Erro ao cadastrar usuario:', error);
    return NextResponse.json(
      { message: 'Erro ao cadastrar usuário.' },
      { status: 500 }
    );
  }
}