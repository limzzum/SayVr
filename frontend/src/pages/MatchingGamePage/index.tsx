import React, { useEffect, useState } from "react";
import { subscribeURL, imageURL, publishURL } from "./constants/constants";
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
  draw: boolean;
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
  const [answer, setAnswer] = useState("");
  const [gameStatus, setGameStatus] = useState<GameStatus>();
  const [chatMessage, setChatMessage] = useState<ChatMessageDto>({
    userId: "1",
    message: "",
  });
  const [isEndGame, setIsEndGame] = useState(false);
  const [endMessage, setEndMessage] = useState("");

  const [gameResult, setGameResult] = useState<GameResultDto>({
    draw: false,
    winnerId: 0,
    loserId: 0,
    winnerPoint: 0,
    loserPoint: 0,
    drawPoint: 0,
  });

  const history = useNavigate();
  const saveGameStatus = (response: SocketResponseDto<any>) => {
    console.log("save game status ");
    console.log(response);
    setGameStatus(response.gameStatusDto);
    setGameStatus((prevGameStatus: any) => ({
      ...prevGameStatus,
      playerA:
        response.gameStatusDto!.playerA.userId.toString() ==
        localStorage.getItem("userId")!
          ? response.gameStatusDto!.playerA
          : response.gameStatusDto!.playerB,
      playerB:
        response.gameStatusDto?.playerB.userId.toString() ==
        localStorage.getItem("userId")!
          ? response.gameStatusDto!.playerA
          : response.gameStatusDto!.playerB,
    }));
    console.log("local 저장한 상태 " + JSON.stringify(gameStatus));
    localStorage.setItem("gameStatus", JSON.stringify(gameStatus));
  };

  const socketReceive = (response: SocketResponseDto<any>) => {
    console.log("게임 대기 페이지 socket 응답받음");
    if (response.socketType == SocketType.GAME_START) {
      console.log("게임 매칭");
      Socket.sendMsg(publishURL + "." + gameId, messageToSend);

      saveGameStatus(response);
      setGameStatus((prevGameStatus: any) => ({
        ...prevGameStatus,
        quizEndTime: Date.now() + 3000,
      }));

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
        let username =
          response.data.userId == playerA.userId
            ? playerA.nickname
            : playerB.nickname;

        saveGameStatus(response);
      }
    }

    if (response.socketType == SocketType.PLAYER_OUT) {
      console.log("상대 플레이어 게임 떠남.");
      console.log(response.socketType);
      setEndMessage(response.message!);
      setGameResult(response.data);
      setIsEndGame(true);
      localStorage.removeItem("gameStatus");

      alert("상대 플레이어 게임 떠남.");
    }

    if (response.socketType == SocketType.GAME_INFO) {
      console.log("게임 info");
      saveGameStatus(response);
    }

    if (response.socketType == SocketType.QUIZ_TIME_OVER) {
      console.log("퀴즈 타임 오버 문제 업데이트");
      saveGameStatus(response);
    }

    if (response.socketType == SocketType.GAME_END) {
      console.log("게임 end");
      setEndMessage(response.message!);
      setGameResult(response.data);
      setIsEndGame(true);
      localStorage.removeItem("gameStatus");
    }

    console.log("socket 구독 receive");
    console.log(response);
  };

  const messageToSend: sendMessage = {
    socketType: SocketType.GAME_INFO,
    message: "hihi",
  };

  useEffect(() => {
    console.log("localstorage : " + localStorage.getItem("gameStatus"));

    Socket.connect().then(() => {
      if (localStorage.getItem("gameStatus") != null) {
        console.log("not null");
        setGameStatus(JSON.parse(localStorage.getItem("gameStatus")!));
        setGameId(JSON.parse(localStorage.getItem("gameStatus")!).gameId);
        setGameStart(true);
      } else {
        console.log("else");
        console.log("connect");
        waitingGame()
          .then((response) => {
            console.log(response);
            console.log("is start : " + response.data.data.gameStart);

            setGameId(response.data.data.gameId);
            oldgameId = response.data.data.gameId;
            console.log("set 게임 아이디 : " + gameId);

            let img =
              response.data.data.profile == null
                ? "default.png"
                : response.data.data.profile;
            setImageUrl(imageURL + img);

            if (response.data.data.gameStart) {
              startGame();
            }

            return () => {};
          })
          .catch((error) => {
            console.log("wait axios 요청");
          });
      }
    });

    return () => {
      console.log("게임 아이디 : " + oldgameId);
      console.log("state gameId " + gameId);
      Socket.sendMsg(publishURL + "." + oldgameId, {
        socketType: SocketType.PLAYER_OUT,
        message: "out",
      });
      Socket.disconnect();
      console.log("페이지 이동 , socket disconnect");
      localStorage.removeItem("gameStatus");
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

  useEffect(() => {
    if (gameStatus) {
      localStorage.setItem("gameStatus", JSON.stringify(gameStatus));
    }

    return () => {};
  }, [gameStatus]);

  if (gameStart) {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <GameProceedingHeader
          player={gameStatus!.playerA!}
          opponent={gameStatus!.playerB!}
        ></GameProceedingHeader>
        <GameProceedingBody
          gameId={gameStatus!.gameId!}
          chatMessage={chatMessage}
          question={gameStatus!.question}
          curRound={gameStatus!.curRound}
          answer={gameStatus!.answer}
          endTime={gameStatus!.quizEndTime!}
        />
        <Modal
          isOpen={isEndGame}
          onRequestClose={() => {}}
          contentLabel="Example Modal"
          className="Modal"
        >
          <div>{endMessage}</div>
          {gameResult.draw ? (
            <div>무승부</div>
          ) : (
            <div>
              <div>winner : {gameResult.winnerId}</div>
              <div>loser : {gameResult!.loserId}</div>
            </div>
          )}

          <div>
            {" "}
            point : +{" "}
            {gameResult.draw
              ? gameResult!.drawPoint
              : gameResult!.winnerId.toString() ==
                localStorage.getItem("userId")
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
          image={
            gameStatus?.playerA.profile == null
              ? imageUrl
              : gameStatus?.playerA.profile
          }
          rankPoint1={gameStatus?.playerA.point}
          name1={gameStatus?.playerA.nickname}
          opponent={gameStatus?.playerB.profile}
          rankPoint2={gameStatus?.playerB.point}
          name2={gameStatus?.playerB.nickname}
          isMatch={isMatch}
        ></Body>
        <Footer />
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
