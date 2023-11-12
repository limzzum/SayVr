import { useEffect, useState } from "react";
import button from "../../../assets/MatchingGamePageAssets/uil_exit.png";
import Socket, {
  SocketType,
} from "../../../pages/MatchingGamePage/constants/socket";
import { useNavigate } from "react-router-dom";

import "./style.css";
import {
  publishURL,
  socketURL,
} from "../../../pages/MatchingGamePage/constants/constants";

const Header: React.FC<{ gameId: number | null }> = (gameId) => {
  const [waitingSeconds, setWaitingSeconds] = useState(0);
  const history = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setWaitingSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedTime = `${String(minutes).padStart(2, "0")} : ${String(
      remainingSeconds
    ).padStart(2, "0")}`;
    return formattedTime;
  };
  return (
    <div className="header-container">
      <div className="matching-game-container"></div>
      <div className="waiting-time">{formatTime(waitingSeconds)}</div>
      <img
        className="exit-button"
        onClick={() => {
          if (gameId) {
            Socket.sendMsg(publishURL + "." + gameId, {
              socketType: SocketType.PLAYER_OUT,
              message: "out",
            });
            history("/");
          }
        }}
        src={button}
        alt="Exit"
      />
    </div>
  );
};

export default Header;
