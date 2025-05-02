'use client';

import React from 'react';
import styles from "./man.module.css";

type ManProps = {
    attempts: number;
};

export default function Man(props: ManProps) {
    return (
        <div className="hangman-container" style={styles}>
            <div className="gallows">
                <div className="gallows-base"></div>
                <div className="gallows-pole"></div>
                <div className="gallows-top"></div>
                <div className="gallows-rope"></div>
            </div>
            
            <div className="man">
                {props.attempts > 0 && <div className="head"></div>}
                {props.attempts > 1 && <div className="body"></div>}
                {props.attempts > 2 && <div className="arm left-arm"></div>}
                {props.attempts > 3 && <div className="arm right-arm"></div>}
                {props.attempts > 4 && <div className="leg left-leg"></div>}
                {props.attempts > 5 && <div className="leg right-leg"></div>}
                
                {props.attempts > 0 && (
                    <div className="face">
                        <div className="eyes">
                            <div className="eye left-eye"></div>
                            <div className="eye right-eye"></div>
                        </div>
                        {props.attempts > 5 ? (
                            <div className="mouth sad"></div>
                        ) : (
                            <div className="mouth"></div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}