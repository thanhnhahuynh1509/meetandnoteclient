import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const sock = new SockJS("//localhost:8080:/ws");
const stompClient = Stomp.over(sock);

export const connect = (roomId, handleProcess) => {
  stompClient.connect({}, (frame) => {
    stompClient.subscribe("/topic/" + roomId, (message) => {
      const component = JSON.parse(message.body);
      console.log(component);
    });
  });
};

export const send = (roomId, message) => {
  stompClient.send("/app/" + roomId, {}, JSON.stringify(message));
};
