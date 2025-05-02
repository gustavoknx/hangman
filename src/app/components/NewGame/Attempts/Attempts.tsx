'use client';

import React, { useEffect, useState } from 'react';

type AttemptsProps = {
    word: string;
    attempts: string;
};

export default function Attempts(props: AttemptsProps) {
    const [correct, setCorrect] = useState<string>("");
    const [wrong, setWrong] = useState<string>("");

    useEffect(() => {
        const getAttempts = async () => {
            let correct = "";
            let wrong = "";
            for (var char of props.word){
                if (props.attempts.includes(char)){
                    correct += char;
                } else {
                    correct += "_";
                    if (!wrong.includes(char)){
                        wrong += char;
                    }
                }
            }
            setCorrect(correct);
            setWrong(wrong);
        };
        getAttempts();
    }, [props.attempts]);
    
    return (
        <div className="attempts">
            {correct.length > 0 && (
                <div className="correct">
                    {correct}
                </div>
            )}
            {wrong.length > 0 && (
                <div className="wrong">
                    {wrong}
                </div>
            )}
        </div>
    );
}