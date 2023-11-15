import React, { useEffect, useState } from "react";
import {
  socketURL,
  subscribeURL,
  serverURL,
  imageURL,
  publishURL,
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
import GameProceedingHeader from "../../components/MatchingGameComponents/GameProceedingPage/game_proceeding_header";
import GameProceedingBody from "../../components/MatchingGameComponents/GameProceedingPage/game_proceeding_body";
import Modal from "react-modal";
import "./style.css";
import JSConfetti from "js-confetti";
import { conteffi } from "../../App";

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

interface GameResultDto {
  isDraw: boolean;
  winnerId: number;
  loserId: number;
  winnerPoint: number;
  loserPoint: number;
  drawPoint: number;
}

interface ChatMessageDto {
  userId: string;
  message: string;
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
  let oldgameId = 0;
  const [gameStart, setGameStart] = useState(false);
  const [isMatch, setIsMatch] = useState(false);

  const [imageUrl, setImageUrl] = useState("");

  const [curRound, setCurRound] = useState(1);
  const [playerA, setPlayerA] = useState<Player>({
    userId: 0,
    nickname: "",
    ranking: 0,
    tierImage: "",
    point: 0,
    winCnt: 0,
    profile: "",
  });

  const [playerB, setPlayerB] = useState<Player>({
    userId: 0,
    nickname: "",
    ranking: 0,
    tierImage: "",
    point: 0,
    winCnt: 0,
    profile: "",
  });

  const [question, setQuestion] = useState("");
  const [chatMessage, setChatMessage] = useState<ChatMessageDto>({
    userId: "1",
    message: "",
  });
  const [isEndGame, setIsEndGame] = useState(false);
  const [endMessage, setEndMessage] = useState("");


  const [gameResult, setGameResult] = useState<GameResultDto>({
    isDraw: false,
    winnerId: 0,
    loserId: 0,
    winnerPoint: 0,
    loserPoint: 0,
    drawPoint: 0,
  });

  const history = useNavigate();

  const socketReceive = (response: SocketResponseDto<any>) => {
    console.log("게임 대기 페이지 socket 응답받음");
    if (response.socketType == SocketType.GAME_START) {
      console.log("게임 매칭");
      response.gameStatusDto!.playerA.userId.toString() ==
      localStorage.getItem("userId")!
        ? setPlayerA(response.gameStatusDto!.playerA)
        : setPlayerA(response.gameStatusDto!.playerB);
      response.gameStatusDto?.playerB.userId.toString() ==
      localStorage.getItem("userId")!
        ? setPlayerB(response.gameStatusDto!.playerA)
        : setPlayerB(response.gameStatusDto!.playerB);

      Socket.sendMsg(publishURL + "." + gameId, messageToSend);

      setIsMatch(true);
      const timer = setTimeout(() => {
        setGameStart(true);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }

    if (response.socketType == SocketType.CHAT) {
      console.log("채팅");
      setChatMessage(response.data);
    }

    if (response.socketType == SocketType.QUIZ) {
      console.log("퀴즈 정보");
      if (response.data.answer) {
        handleClick();
        let username = response.data.userId == playerA.userId? playerA.nickname : playerB.nickname
        setCurRound(response.gameStatusDto!.curRound);
        setQuestion(response.gameStatusDto!.question);
        response.gameStatusDto!.playerA.userId.toString() ==
      localStorage.getItem("userId")!
        ? setPlayerA(response.gameStatusDto!.playerA)
        : setPlayerA(response.gameStatusDto!.playerB);
      response.gameStatusDto?.playerB.userId.toString() ==
      localStorage.getItem("userId")!
        ? setPlayerB(response.gameStatusDto!.playerA)
        : setPlayerB(response.gameStatusDto!.playerB);
      };
     
      }
    

    if (response.socketType == SocketType.PLAYER_OUT) {
      console.log("상대 플레이어 게임 떠남.");
      console.log(response.socketType);
      setEndMessage(response.message!);
      setGameResult(response.data);
      setIsEndGame(true);

      alert("상대 플레이어 게임 떠남.");

    }

    if (response.socketType == SocketType.GAME_INFO) {
      console.log("게임 info");
      setCurRound(response.gameStatusDto!.curRound);
      setQuestion(response.gameStatusDto!.question);
    }

    if (response.socketType == SocketType.QUIZ_TIME_OVER) {
      console.log("퀴즈 타임 오버 문제 업데이트")
      setCurRound(response.gameStatusDto!.curRound);
      setQuestion(response.gameStatusDto!.question);
    }


    if (response.socketType == SocketType.GAME_END) {
      console.log("게임 info");
      setEndMessage(response.message!);
      setGameResult(response.data);
      setIsEndGame(true);
    }

    console.log("socket 구독 receive");
    console.log(response);
  };

  const messageToSend: sendMessage = {
    socketType: SocketType.GAME_INFO,
    message: "hihi",
  };

  useEffect(() => {
    Socket.connect().then(() => {
      console.log("connect");
      waitingGame()
        .then((response) => {
          console.log(response);
          console.log("is start : " + response.data.data.gameStart);
          setGameId(response.data.data.gameId);
          oldgameId = response.data.data.gameId;
          console.log("set 게임 아이디 : "+ gameId);

          setImageUrl(imageURL + response.data.data.profile);

          if (response.data.data.gameStart) {
            startGame();
            setIsMatch(true);
            const timer = setTimeout(() => {
              setGameStart(true);
            }, 3000);

            return () => {
              clearTimeout(timer);
            };
          }

          return () => {};
        })
        .catch((error) => {
          console.log("wait axios 요청");
        });
    });

    return () => {
      console.log("게임 아이디 : "+ oldgameId);
      console.log("state gameId "+ gameId)
      Socket.sendMsg(publishURL + "." + oldgameId, {
        socketType: SocketType.PLAYER_OUT,
        message: "out",
      });
      Socket.disconnect();
      console.log("페이지 이동 , socket disconnect");
    };
  }, []);

  useEffect(() => {
    if (gameId) {
      console.log("gameId : " + gameId);
      Socket.subscribe(subscribeURL + "." + gameId, socketReceive);
      // if (gameStart) {
      //   console.log("axios 게임시작 요청 호출");
      //   startGame();
      // }
    }

    return () => {};
  }, [gameId]);

  if (gameStart) {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <GameProceedingHeader
          player={playerA!}
          opponent={playerB!}
        ></GameProceedingHeader>
        <GameProceedingBody
          gameId={gameId!}
          chatMessage={chatMessage}
          question={question}
          curRound={curRound}
        />
        <Modal
          isOpen={isEndGame}
          onRequestClose={() => {}}
          contentLabel="Example Modal"
          className="Modal"
        >
          <div>{endMessage}</div>
          {gameResult.isDraw ? 
            <div>무승부</div>
            :
            <div>
              <div>winner : {gameResult.winnerId}</div>
              <div>loser : {gameResult!.loserId}</div>
              </div>
            
            }

          <div>
            {" "}
            point : +{" "}
            {gameResult!.winnerId.toString() == localStorage.getItem("userId")
              ? gameResult!.winnerPoint
              : gameResult!.loserPoint}
          </div>
          <div>
            <button onClick={() => history("/")}>OK</button>
          </div>
        </Modal>
      </div>
    );
  } else {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Header gameId={gameId} />
        <Body
          image={imageUrl}
          rankPoint1={100}
          opponent={playerB?.profile}
          rankPoint2={200}
          isMatch={isMatch}
        ></Body>
        {!gameStart && <Footer />}
      </div>
    );
  }
}

const handleClick = () => {
  conteffi.addConfetti({
    confettiColors: [
      "#ff0a54",
      "#ff477e",
      "#ff7096",
      "#ff85a1",
      "#fbb1bd",
      "#f9bec7",
    ],
    confettiRadius: 5,
    confettiNumber: 500,
  });
};

export default MatchingGameWaitingPage;
