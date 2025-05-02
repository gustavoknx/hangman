'use client';

import React from 'react';

type KeyboardProps = {
    result: string | null;
    attempts: string;
};

export default function Keyboard(props: KeyboardProps) {
    const onKeyClick = async (e: React.MouseEvent<HTMLElement>) => {
        if (props.result === null && props.attempts.length < 8 && !props.attempts.includes(e.currentTarget.innerText)){
            props.attempts += e.currentTarget.innerText;
        }
    };

    return (
        <table id="keyboard">
            <tr className="row">
                <td className="key"><button onClick={onKeyClick} disabled={props.attempts.includes('Q')}>Q</button></td>
                <td className="key"><button onClick={onKeyClick} disabled={props.attempts.includes('W')}>W</button></td>
                <td className="key"><button onClick={onKeyClick} disabled={props.attempts.includes('E')}>E</button></td>
                <td className="key"><button onClick={onKeyClick} disabled={props.attempts.includes('R')}>R</button></td>
                <td className="key"><button onClick={onKeyClick} disabled={props.attempts.includes('T')}>T</button></td>
                <td className="key"><button onClick={onKeyClick} disabled={props.attempts.includes('Y')}>Y</button></td>
                <td className="key"><button onClick={onKeyClick} disabled={props.attempts.includes('U')}>U</button></td>
                <td className="key"><button onClick={onKeyClick} disabled={props.attempts.includes('I')}>I</button></td>
                <td className="key"><button onClick={onKeyClick} disabled={props.attempts.includes('O')}>O</button></td>
                <td className="key"><button onClick={onKeyClick} disabled={props.attempts.includes('P')}>P</button></td>
            </tr>
            <tr className="row">
                <td className="key"><button onClick={onKeyClick} disabled={props.attempts.includes('A')}>A</button></td>
                <td className="key"><button onClick={onKeyClick} disabled={props.attempts.includes('S')}>S</button></td>
                <td className="key"><button onClick={onKeyClick} disabled={props.attempts.includes('D')}>D</button></td>
                <td className="key"><button onClick={onKeyClick} disabled={props.attempts.includes('F')}>F</button></td>
                <td className="key"><button onClick={onKeyClick} disabled={props.attempts.includes('G')}>G</button></td>
                <td className="key"><button onClick={onKeyClick} disabled={props.attempts.includes('H')}>H</button></td>
                <td className="key"><button onClick={onKeyClick} disabled={props.attempts.includes('J')}>J</button></td>
                <td className="key"><button onClick={onKeyClick} disabled={props.attempts.includes('K')}>K</button></td>
                <td className="key"><button onClick={onKeyClick} disabled={props.attempts.includes('L')}>L</button></td>
                <td className="key"><button onClick={onKeyClick} disabled={props.attempts.includes('Ç')}>Ç</button></td>
            </tr>
            <tr className="row">
                <td className="key"><button onClick={onKeyClick} disabled={props.attempts.includes('Z')}>Z</button></td>
                <td className="key"><button onClick={onKeyClick} disabled={props.attempts.includes('X')}>X</button></td>
                <td className="key"><button onClick={onKeyClick} disabled={props.attempts.includes('C')}>C</button></td>
                <td className="key"><button onClick={onKeyClick} disabled={props.attempts.includes('V')}>V</button></td>
                <td className="key"><button onClick={onKeyClick} disabled={props.attempts.includes('B')}>B</button></td>
                <td className="key"><button onClick={onKeyClick} disabled={props.attempts.includes('N')}>N</button></td>
                <td className="key"><button onClick={onKeyClick} disabled={props.attempts.includes('M')}>M</button></td>
            </tr>
        </table>
    );
}