import { useEffect, useState } from 'react';
import '../main.css';

function Rule({condition, text, inputValue, unlockNewRule}) {
    const [isCorrect, setIsCorrect] = useState(false);

    useEffect(() => {
        setIsCorrect(condition(inputValue))
    }, [inputValue])

    useEffect(() => {
        unlockNewRule();
    }, [isCorrect])
 
    return (
        <>
            <div className={`password-game__rule ${isCorrect ? "true" : "false"}`}>
                <img className="password-game__rule__icon" src={`${isCorrect ? "correct" : "incorrect"}.svg`}></img>
                <div className="password-game__rule__text">{text}</div>
            </div>
        </>
    )
}

export default Rule;