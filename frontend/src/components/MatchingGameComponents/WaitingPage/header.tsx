import{ useEffect, useState } from "react";
import button from '../../../assets/MatchingGamePageAssets/uil_exit.png'
import "./style.css";


function Header(){
    const [waitingSeconds, setWaitingSeconds] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
          setWaitingSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);
    
        return () => {
          clearInterval(interval);
        };
      }, []);
    
      const formatTime = (seconds:number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedTime = `${String(minutes).padStart(2, '0')} : ${String(remainingSeconds).padStart(2, '0')}`;
        return formattedTime;
      };
    return (
        <div  className="header-container">
            <div className="matching-game-container"></div>
            <div className="waiting-time">{formatTime(waitingSeconds)}</div>
            <img className="exit-button" src={button} alt="Exit"/>
        </div>

    
    );

}

export default Header;

