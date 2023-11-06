import { Stomp, Frame } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { socketURL} from "../constants/constants";


let stompClient: any = null;
let socketConnect: any = null;

export const connect = (): Promise<void> =>
  new Promise((resolve, reject) => {
    const socketFactory = () => new SockJS(socketURL);
    socketConnect = socketFactory();
    const client = Stomp.over(socketFactory());

    client.connect(
      {},
      () => {
        stompClient = client;
        resolve();
      },
      (error: any) => {
        console.error("소켓 연결 실패 5초 후 재연결", error);
        setTimeout(() => connect(), 5000);
        reject(error);
      }
    );
  });

export const disconnect = () => {
  if (stompClient && stompClient.connected) {
    stompClient.disconnect();
  }
  if (socketConnect && socketConnect.readyState === WebSocket.OPEN) {
    socketConnect.close();
  }
};

export const sendMsg = (destination: any, body={}) => { 
  if(stompClient && stompClient.connected) { 
    stompClient.send(destination, {}, JSON.stringify(body));
  }
};

export const subscribe = (destination: string, callback: any) => {

  console.log("구독 호출은 됐는데");
  if (stompClient && stompClient.connected) {
    console.log("subscribe const 호출됨")
    return stompClient.subscribe(destination, (message: Frame) => {
      let parsedBody;
      try {
        parsedBody = JSON.parse(message.body);
      } catch (error) {
        parsedBody = message.body;
      }
      callback(parsedBody);
    });
  }
};


export enum SocketType {
    GAME_INFO = "GAME_INFO",
    GAME_END = "GAME_END",
    CHAT = "CHAT",
    QUIZ = "QUIZ",
    QUIZ_TIME_OVER = "QUIZ_TIME_OVER",
    PLAYER_OUT = "PLAYER_OUT",
  }

  export interface GameStatus {
    gameId : number,
    curRound : number,
    playerA : Player,
    playerB : Player,
    question : string,
    answer : string

  }

  export interface Player {
    userId : number,
    ranking : number,
    point : number,
    winCnt : number,
    profile : string
    
  }

  
  export interface SocketResponseDto<T> {
    socketType : SocketType,
    gameStatus : GameStatus,
    data: T,
    message: string;
  }

const apiStomtModule= { connect, disconnect, sendMsg, subscribe, SocketResponseDto(){} };
export default apiStomtModule;