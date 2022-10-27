import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let stompClient = null;

export const connect = (roomId, handleProcess) => {
  const sock = new SockJS("//localhost:8080/ws");
  stompClient = Stomp.over(sock);
  stompClient.connect({}, () => {
    stompClient.subscribe("/topic/" + roomId, (message) => {
      const component = JSON.parse(message.body);
      handleProcess(component);
    });
  });
};

export const send = (roomId, message) => {
  stompClient.send("/app/" + roomId, {}, JSON.stringify(message));
};
