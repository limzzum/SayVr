import "./style.css";
import React, { useEffect, useState } from "react";
import { socketURL, subscribeURL, serverURL, imageURL } from "./constants/constants";
import Socket from "./constants/socket";
import { useNavigate } from 'react-router-dom';
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

interface SocketResponseDto<T> {
  socketType? : SocketType,
  gameStatus? : GameStatus,
  data?: T,
  message?: string;
}


function MatchingGamePage() {
  const [gameId, setGameId] = useState<number | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [waitingSeconds, setWaitingSeconds] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const history = useNavigate();

  const messageToSend: sendMessage = {
    socketType: SocketType.GAME_INFO,
    message: "hihi",
  };

  
  const socketReceive = (response: SocketResponseDto<any>) => {

    if(response.socketType == SocketType.GAME_INFO){
      console.log("게임 매칭")
      history('/MatchingGame/game')
    }
    console.log("비교 " +response.socketType === SocketType.GAME_INFO)
    console.log("socket 구독 receive");
    const context = response;
    console.log(response.socketType);
  };


  Socket.connect();
  useEffect(() => {
    // publishMessageToChatRoom(1, messageToSend);
    console.log("axios 요청 호출");
    waitingGame()
      .then((response) => {
        console.log(response);
        setGameId(response.data.data.gameId);
        console.log("gameId : " + gameId);
      
        // gameId && Socket.subscribe(subscribeURL+"."+gameId, socketReceive)


        setImageUrl(imageURL + response.data.data.profile);
        console.log("image : "+imageUrl);

        // const subscription = gameId && subscribeToChatRoom(gameId);

        return () => {};
      })
      .catch((error) => {
        // 오류 처리
      });

    return () => {};
  }, []);

  useEffect(() => {
    if (gameId) {
      console.log("use effect : "+gameId)
      Socket.subscribe(subscribeURL+"."+gameId, socketReceive)
      setIsSubscribed(true);
    }
    // if(imageUrl){
    //   console.log("useEffect image : "+ imageUrl)
    // }


    return () => {
      Socket.disconnect();
    };
  },[gameId] );

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
    <div className="matching-game-container">
      <div className="waiting-time">{formatTime(waitingSeconds)}</div>
      {imageUrl && (
        <img src={imageUrl} alt="Game Image" className="profile-image" />
      )}

      <div className="waiting-game-container"></div>
    </div>
  );
}

// function subscribeToChatRoom(gameId: number) {
//   return stompClient.subscribe(`/topic/game.${gameId}`, (message: Frame) => {
//     console.log("Received message:");

//     const receivedMessage: receiveMessage = JSON.parse(message.body);
//     console.log("Received message:", receivedMessage);
//   });
// }

// function publishMessageToChatRoom(gameId: number, message: sendMessage) {
//   stompClient.publish({
//     destination: `/pub/game.${gameId}`,
//     body: JSON.stringify(message),
//   });
// }

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
