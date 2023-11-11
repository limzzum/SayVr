import React, { useEffect, useState } from "react";
import {
  socketURL,
  subscribeURL,
  serverURL,
  imageURL,
  publishURL,
} from "../constants/constants";
import { useLocation, useNavigate } from "react-router-dom";
import {
  SocketType,
} from "../../../api/MatchingGameAPI/MatchingGameAPI";
import Socket from "../constants/socket";

import GameProceedingHeader from "../../../components/MatchingGameComponents/GameProceedingPage/game_proceeding_header";
import GameProceedingBody from "../../../components/MatchingGameComponents/GameProceedingPage/game_proceeding_body";

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

interface PlayerProfile {
  name: string;
  profile: string;
  ranking: number;
  tier: string;
}

// let curRound: number;
// let playerA: Player;
// let playerB: Player;
// let question: string;

function MatchingGameProceedingPage() {
   const [curRound, setCurRound] = useState(1);
   const [playerA, setPlayerA] = useState<Player>({
    userId: 0,
    nickname: '',
    ranking: 0,
    tierImage: '',
    point: 0,
    winCnt: 0,
    profile: '',
  });
  const [playerB, setPlayerB] = useState<Player>({
    userId: 0,
    nickname: '',
    ranking: 0,
    tierImage: '',
    point: 0,
    winCnt: 0,
    profile: '',
  });
   const [question, setQuestion] = useState("");
   const [chatMessage, setChatMessage] = useState("");


  const location = useLocation();
  const gameInfo = { ...location.state };



  // const messageToSend: sendMessage = {
  //   socketType: SocketType.GAME_INFO,
  //   message: "hihi",
  // };

  const socketReceive = (response: SocketResponseDto<any>) => {
    console.log("게임 진행 소켓 받음");
    console.log(response);
    if (response.socketType == SocketType.GAME_INFO) {
      console.log("게임 info");
      setCurRound(response.gameStatusDto!.curRound);
      setPlayerA(response.gameStatusDto!.playerA);
      setPlayerB(response.gameStatusDto!.playerB);
      setQuestion(response.gameStatusDto!.question);
    }

    if (response.socketType == SocketType.CHAT) {
      console.log("채팅");
      setChatMessage(response.data);

    }

    if (response.socketType == SocketType.QUIZ) {
      console.log("퀴즈 정보");
      if(response.data.answer){
        setCurRound(response.gameStatusDto!.curRound);
        setPlayerA(response.gameStatusDto!.playerA);
        setPlayerB(response.gameStatusDto!.playerB);
        setQuestion(response.gameStatusDto!.question);
        // let username = response.data.userId == playerA.userId? playerA.nickname : playerB.nickname
        alert( "유저 아이디 : " + response.data.userId + " 정답입니다")
      }
    }

    if (response.socketType == SocketType.QUIZ_TIME_OVER) {
      console.log("퀴즈 시간 종료");
      alert("퀴즈 시간 종료")
   
    }

    if (response.socketType == SocketType.GAME_END) {
      console.log("게임 종료");
      alert("게임 종료")

    
    }
 
    if (response.socketType == SocketType.PLAYER_OUT) {
      console.log("player out");
                           
    }

    console.log("socket 구독 receive");
    console.log(response);
  };

  const messageToSend: sendMessage = {
    socketType: SocketType.GAME_INFO,
    message: "hihi",
  };

  useEffect(() => {
    setPlayerA(gameInfo.playerA);
    setPlayerB(gameInfo.playerB);
    Socket.connect().then(()=>{
      Socket.subscribe(subscribeURL + "." + gameInfo.gameId, socketReceive);
      console.log(gameInfo.gameId);
      console.log("useEffect socket 연결")
      Socket.sendMsg(publishURL + "."+gameInfo.gameId, messageToSend)
  
    })
 
    //Socket.sendMsg
    return () => {
      Socket.disconnect();
      console.log("게임 진행 페이지 , socket disconnect");

    };
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <GameProceedingHeader
        player={playerA}
        opponent={playerB}
      ></GameProceedingHeader>
      <GameProceedingBody gameId={gameInfo.gameId} chatMessage={chatMessage} question={question}/>
      {/* <GameProceedingHeader player=/> */}
    </div>
  );
}

export default MatchingGameProceedingPage;
