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

  const [curRound, setCurRound] = useState(1);
  const [playerA, setPlayerA] = useState<Player>();
  const [playerB, setPlayerB] = useState<Player>();

  const [question, setQuestion] = useState("");
  const [chatMessage, setChatMessage] = useState("");

  const history = useNavigate();

  const socketReceive = (response: SocketResponseDto<any>) => {
    console.log("게임 대기 페이지 socket 응답받음");
    if (response.socketType == SocketType.GAME_START) {
      console.log("게임 매칭");
      response.gameStatusDto?.playerA.userId == 1
        ? setPlayerA(response.gameStatusDto!.playerA)
        : setPlayerA(response.gameStatusDto!.playerB);
      response.gameStatusDto?.playerB.userId == 1
        ? setPlayerA(response.gameStatusDto!.playerB)
        : setPlayerB(response.gameStatusDto!.playerA);

      // player = response.gameStatusDto!.playerA;
      // opponent = response.gameStatusDto!.playerB;

      // setPlayerA(player);
      // setPlayerB(opponent);
      Socket.sendMsg(publishURL + "." + gameId, messageToSend);

      // history("/MatchingGame-game", {
      //   state: {
      //     playerA: player,
      //     playerB: opponent,
      //     gameId: gameId,
      //   },
      // });
      setGameStart(true);
    }

    if (response.socketType == SocketType.CHAT) {
      console.log("채팅");
      setChatMessage(response.data);
    }

    if (response.socketType == SocketType.QUIZ) {
      console.log("퀴즈 정보");
      if (response.data.answer) {
        setCurRound(response.gameStatusDto!.curRound);

        // setPlayerA(response.gameStatusDto!.playerA);
        // setPlayerB(response.gameStatusDto!.playerB);
        setQuestion(response.gameStatusDto!.question);
        // let username = response.data.userId == playerA.userId? playerA.nickname : playerB.nickname
        alert("유저 아이디 : " + response.data.userId + " 정답입니다");
      }
    }

    if (response.socketType == SocketType.PLAYER_OUT) {
      console.log("상대 플레이어 게임 떠남.");
      // alert("상대 플레이어 게임 떠남.");
      // private boolean isDraw;
      //   private Long winnerId;
      //   private Long loserId;
      //   private int winnerPoint;
      //   private int loserPoint;
      //   private int drawPoint;
    }

    if (response.socketType == SocketType.GAME_INFO) {
      console.log("게임 info");
      setCurRound(response.gameStatusDto!.curRound);
      setPlayerA(response.gameStatusDto!.playerA);
      setPlayerB(response.gameStatusDto!.playerB);
      setQuestion(response.gameStatusDto!.question);
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

  if (gameStart) {
    setTimeout(() => {}, 10000);
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
        />
        {/* <GameProceedingHeader player=/> */}
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
        ></Body>
        {!gameStart && <Footer />}
      </div>
    );
  }
}

export default MatchingGameWaitingPage;
