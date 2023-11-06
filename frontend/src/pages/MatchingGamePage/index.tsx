import "./style.css";
import React, { useEffect, useState } from "react";
import axios from "axios"; // Axios 추가
import { socketURL, serverURL } from "./constants/constants";
import { Client, Frame } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { config } from "process";
import {
  SocketType,
  waitingGame,
} from "../../api/MatchingGameAPI/MatchingGameAPI";

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
  ranking: number;
  point: number;
  winCnt: number;
  profile: string;
}

const socket = new SockJS(socketURL);
const stompClient = new Client({ webSocketFactory: () => socket });

stompClient.activate();

function MatchingGamePage() {
  const [gameId, setGameId] = useState<number | null>(null);
  const [imageUrl, setImageUrl] = useState(""); // 이미지 URL 상태

  const messageToSend: sendMessage = {
    socketType: SocketType.GAME_INFO,
    message: "hihi",
  };

  useEffect(() => {
    // publishMessageToChatRoom(1, messageToSend);
    console.log("axios 요청 호출");
    waitingGame()
      .then((response) => {
        console.log(response);
        setGameId(response.data.data.gameId);
        setImageUrl(serverURL + "/profiles/" + response.data.data.profile);

        // const subscription = gameId && subscribeToChatRoom(gameId);

        return () => {};
      })
      .catch((error) => {
        // 오류 처리
      });

    return () => {};
  }, []);

  useEffect(() => {
    if (stompClient && gameId) {
      console.log("구독 실행 전");
      subscribeToChatRoom(gameId);
    }

    return () => {
      stompClient.deactivate();
    };
  }, [stompClient]);
  return (
    <div className="matching-game-container">
      {imageUrl && (
        <img src={imageUrl} alt="Game Image" className="profile-image" />
      )}

      <div className="waiting-game-container"></div>
    </div>
  );
}

function subscribeToChatRoom(gameId: number) {
  return stompClient.subscribe(`/topic/game.${gameId}`, (message: Frame) => {
    console.log("Received message:");

    const receivedMessage: receiveMessage = JSON.parse(message.body);
    console.log("Received message:", receivedMessage);
  });
}

function publishMessageToChatRoom(gameId: number, message: sendMessage) {
  stompClient.publish({
    destination: `/pub/game.${gameId}`,
    body: JSON.stringify(message),
  });
}

function MatchingGameStart() {
  // const [gameId, setGameId] = useState<number | null>(null);

  // const messageToSend: sendMessage = {
  //   socketType: SocketType.GAME_INFO,
  //   message: "hihi",
  // };

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

  return <div className="matching-game-container"></div>;
}

export { MatchingGamePage, MatchingGameStart };
