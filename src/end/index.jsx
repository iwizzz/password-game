import { useEffect, useState } from "react";

function End({overload, isNotEnd, time}) {
    const [gameDuration, setGameDuration] = useState(0);

    useEffect (() => {
        setGameDuration(Math.trunc((Date.now() - time.startTime) / 1000))
        console.log(time.startTime, gameDuration)
    }, [isNotEnd.status])
    

    return (
        <div className={`password-game__end-wrapper ${isNotEnd.status ? "_hidden": ""}`}>
            <div className="password-game__end-body">
                <h2 className="password-game__h2">Ваш пароль соответствует всем критериям</h2>
                <div className="password-game__timer">Время прохождения: {Math.trunc(gameDuration / 60)}:{gameDuration % 60}</div>
                <button className="password-game__retry-button" onClick={() => {
                    overload.setIsRetry(!overload.isRetry);
                    time.setStartTime(Date.now());
                    isNotEnd.setIsNotEnd(true);
                    
                }}>Начать занова</button>
            </div>
        </div>
    )
}

export default End;