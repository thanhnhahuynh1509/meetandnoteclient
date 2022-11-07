import CardOption from "./CardOption";
import "./css/CardChat.css";
import UserRound from "./UserRound";
import { useSelector } from "react-redux";
import { selectChat, updateChat } from "../../../../store/chat-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import { send } from "../../../../utils/sockjs/client-sockjs";
import { useParams } from "react-router-dom";

function CardChat(props) {
  const chat = useSelector(selectChat);
  const { roomId } = useParams();

  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  const getCurrentDate = () => {
    const currentdate = new Date();
    const datetime =
      currentdate.getDate() +
      "-" +
      (currentdate.getMonth() + 1) +
      "-" +
      currentdate.getFullYear() +
      " " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes();
    return datetime;
  };

  const handleSend = (e) => {
    const chatObject = {
      id: v4(),
      content: value,
      date: getCurrentDate(),
      name: user.firstName + " " + user.lastName,
      avatar: user.avatar,
    };
    dispatch(updateChat(chatObject));
    setValue("");
    send(roomId, { ...chatObject, command: "CHAT" });
  };

  return (
    <>
      <CardOption {...props} className={"CardChat"}>
        <div className="option-bar-header">
          <h4 className="option-bar-title">Tin nhắn</h4>
        </div>

        <div className="option-bar-chats">
          {chat.map((c, index) => {
            return (
              <div key={c.id} className="option-bar-chat">
                <div className="chat-bar-header-content">
                  <UserRound avatar={c.avatar} size={30} />
                  <div className="chat-content-text">
                    <p style={{ fontWeight: "400" }}>{c.content}</p>
                  </div>
                </div>
                <div className="chat-bar-header-time">
                  <p>
                    {c.date}
                    <strong style={{ marginLeft: "10px" }}>{c.name}</strong>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="option-bar-chat-form">
          <div className="option-bar-form-contains">
            <textarea
              rows="3"
              onChange={(e) => setValue(e.target.value)}
              value={value}
            ></textarea>
            <button className="button-transparent" onClick={handleSend}>
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </CardOption>
    </>
  );
}

export default CardChat;
