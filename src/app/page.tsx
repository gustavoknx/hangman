'use client';

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { User } from "./types/types";
import MainMenu from "./components/MainMenu/MainMenu";
import RegisterForm from "./components/Register/RegisterForm";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  async function loadUser() {
    const response = await fetch('/api/user', 
    {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      setUser({ username: atob(data.username), score: data.score});
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Hangman</h1>
        { user ? (
          <MainMenu user={user}/>
        ): <RegisterForm loadUser={loadUser}/>}
      </main>
      <footer className={styles.footer}>
        <a
          href="mailto:gustavo.sobrinho95@outlook.com"
        >
          Developed by Gustavo Sobrinho © 2025
        </a>
      </footer>
    </div>
  );
}
