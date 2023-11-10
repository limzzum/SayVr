import React, { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import {
  SocketType,
  waitingGame,
  startGame,
} from "../../../api/MatchingGameAPI/MatchingGameAPI";
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
  gameStatus?: GameStatus;
  data?: T;
  message?: string;
}

interface PlayerProfile {
  name: string;
  profile: string;
  ranking: number;
  tier: string;
}

// const player: PlayerProfile ;
// const opponent: PlayerProfile;

function MatchingGameProceedingPage() {
  // const [gameId, setGameId] = useState<number | null>(null);
  const location = useLocation();
  const players = { ...location.state };

  // const messageToSend: sendMessage = {
  //   socketType: SocketType.GAME_INFO,
  //   message: "hihi",
  // };

  const socketReceive = (response: SocketResponseDto<any>) => {
    if (response.socketType == SocketType.GAME_INFO) {
      console.log("게임 info");
      console.log(response);
    }

    console.log("socket 구독 receive");
    console.log(response);
  };

  // useEffect(() => {
  //   // 컴포넌트가 마운트될 때, 웹 소켓을 사용할 준비
  //   stompClient.activate();
  //   console.log("axios 요청 호출");
  //   waitingGame()
  //     .then((response) => {
  //       console.log(response);

  //       setGameId(response.data.data.gameId);
  //       console.log("함수 호출 전");

  //       // 게임 아이디를 받아온 후, 웹 소켓을 초기화하고 구독합니다.
  //       const subscription = subscribeToChatRoom(response.data.data.gameId);

  //       return () => {
  //         // 컴포넌트가 언마운트될 때 구독을 해제
  //         subscription.unsubscribe();
  //       };
  //     })
  //     .catch((error) => {
  //       // 오류 처리
  //     });

  //   return () => {
  //     // 컴포넌트가 언마운트될 때, 웹 소켓 연결 해제
  //     stompClient.deactivate();
  //   };
  // }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <GameProceedingHeader
        player={players.playerA}
        opponent={players.playerB}
      ></GameProceedingHeader>
      <GameProceedingBody />
      {/* <GameProceedingHeader player=/> */}
    </div>
  );
}

export default MatchingGameProceedingPage;
