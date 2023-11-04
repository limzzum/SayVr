import './style.css';
import React, { useEffect } from 'react';
import { URL } from './constants/constants';
import { Client, Frame } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

enum SocketType {
  GAME_INFO = 'GAME_INFO',
  GAME_END = 'GAME_END',
  CHAT = 'CHAT',
  QUIZ = 'QUIZ',
  QUIZ_TIME_OVER = 'QUIZ_TIME_OVER',
  PLAYER_OUT = 'PLAYER_OUT',
}

interface receiveMessage {
  socketType: SocketType;
  gameStatus: GameStatus;
  data: any;
  message: string;
}

interface sendMessage {
  socketType: SocketType;
  message: string;
}

interface GameStatus {
  gameId: bigint;
  curRound: number;
  playerA: Player;
  playerB: Player;
  question: string;
  answer: string;
  quizEndTime?: Date;
}

interface Player {
  userId: bigint;
  ranking: bigint;
  point: bigint;
  winCnt: number;
  profile: string;
}

const socket = new SockJS(URL);
const stompClient = new Client({ webSocketFactory: () => socket });

stompClient.activate();

function MatchingGamePage() {
  const messageToSend: sendMessage = {
    socketType: SocketType.GAME_INFO,
    message: "hihi",
  };

  useEffect(() => {
    const subscription = subscribeToChatRoom('5');

    return () => {
      // 컴포넌트가 언마운트될 때 구독을 해제
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="matching-game-container">
      {/* 웹 소켓과 관련된 UI를 추가할 수 있습니다 */}
    </div>
  );
}

function subscribeToChatRoom(gameId: string) {
  return stompClient.subscribe(`/topic/game.${gameId}`, (message: Frame) => {
    const receivedMessage:receiveMessage = JSON.parse(message.body);
    console.log('Received message:', receivedMessage);
  });
}

function publishMessageToChatRoom(gameId: string, message: sendMessage) {
  stompClient.publish({
    destination: `/pub/game.${gameId}`,
    body: JSON.stringify(message),
  });
}

export default MatchingGamePage;
