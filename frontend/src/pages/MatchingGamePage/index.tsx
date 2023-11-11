import React, { useEffect, useState } from "react";
import {
  socketURL,
  subscribeURL,
  serverURL,
  imageURL,
} from "./constants/constants";
import Socket from "./constants/socket";
import { useNavigate } from "react-router-dom";
import {
  SocketType,
  waitingGame,
  startGame,
} from "../../api/MatchingGameAPI/MatchingGameAPI";
import Header from "../../components/MatchingGameComponents/WaitingPage/header";
import Body from "../../components/MatchingGameComponents/WaitingPage/body";
import Footer from "../../components/MatchingGameComponents/WaitingPage/footer";

interface receiveMessage {
  socketType: SocketType;
  gameStatus?: GameStatus;
  data: any;
  message: string;
}

interface sendMessage {
  socketType: SocketType;
  message: string;
}

interface GameStatus {
  gameId: number;
  curRound: number;
  playerA: Player;
  playerB: Player;
  question: string;
  answer: string;
  quizEndTime?: Date;
}

interface Player {
  userId: number;
  nickname: string;
  ranking: number;
  tierImage: string;
  point: number;
  winCnt: number;
  profile: string;
}

interface SocketResponseDto<T> {
  socketType: SocketType;
  gameStatusDto?: GameStatus;
  data?: T;
  message?: string;
}

let player: Player;
let opponent: Player;
let gameId: number;

function MatchingGameWaitingPage() {
  const [gameId, setGameId] = useState<number | null>(null);
  const [gameStart, setGameStart] = useState(false);

  const [imageUrl, setImageUrl] = useState("");
  const history = useNavigate();

  const socketReceive = (response: SocketResponseDto<any>) => {
    console.log("게임 대기 페이지 socket 응답받음");
    if (response.socketType == SocketType.GAME_START) {
      console.log("게임 매칭");
      player = response.gameStatusDto!.playerA;
      opponent = response.gameStatusDto!.playerB;


      history("/MatchingGame/game", {
        state: {
          playerA: player,
          playerB: opponent,
          gameId: gameId
        },
      });
    }

    if (response.socketType == SocketType.GAME_INFO) {
      console.log("게임 info");
      console.log(response);
    }

    console.log("socket 구독 receive");
    console.log(response);
  };

  const messageToSend: sendMessage = {
    socketType: SocketType.GAME_INFO,
    message: "hihi",
  };

  useEffect(() => {
    Socket.connect();
    console.log("axios 요청 호출");
    waitingGame()
      .then((response) => {
        console.log(response);
        console.log("is start : " + response.data.data.gameStart);
        setGameId(response.data.data.gameId);
        setImageUrl(imageURL + response.data.data.profile);
        setGameStart(response.data.data.gameStart);

        return () => {};
      })
      .catch((error) => {
        // 오류 처리
      });

    return () => {
      Socket.disconnect();
      console.log("페이지 이동 , socket disconnect");
    };
  }, []);

  useEffect(() => {
    if (gameId) {
      console.log("gameId : " + gameId);
      Socket.subscribe(subscribeURL + "." + gameId, socketReceive);
      if (gameStart) {
        console.log("axios 게임시작 요청 호출");
        startGame();
      }
    }

    return () => {};
  }, [gameId]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header />
      {imageUrl && <Body image={imageUrl}></Body>}
      <Footer />
    </div>
  );
}

export default MatchingGameWaitingPage;
