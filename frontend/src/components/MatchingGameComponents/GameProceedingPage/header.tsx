import{ useEffect, useState } from "react";
import button from '../../../assets/MatchingGamePageAssets/uil_exit.png'
import "./style.css";

interface props {
  player : PlayerProfile,
  opponent : PlayerProfile
}

interface PlayerProfile {
  name : string,
  profile : string,
  ranking : number,
  tier : string
}

const GameProceedingHeader: React.FC<props> = ({player, opponent}) => {
    const [waitingSeconds, setWaitingSeconds] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
          setWaitingSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);
    
        return () => {
          clearInterval(interval);
        };
      }, []);
    
      
    return (
        <div  className="header-container">
            <div className="matching-game-container"></div>
            <img className="exit-button" src={button} alt="Exit"/>
        </div>

    
    );

}

export default GameProceedingHeader;

const Profile = () => {
  return (
    <div className="body-container">
        
    </div>
  );
}
