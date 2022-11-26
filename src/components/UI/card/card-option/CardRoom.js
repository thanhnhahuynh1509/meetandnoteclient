import CardOption from "./CardOption";
import UserRound from "./UserRound";
import "./css/CardRoom.css";
import { useEffect, useState } from "react";
import { getRoomByOwner, getRoomsByUserId } from "../../../../api/room-api";
import { useSelector } from "react-redux";
import { selectComponents } from "../../../../store/component-slice";
import { selectCurrentRoom } from "../../../../store/room-slice";
import { leaveRoom } from "../../../../api/room-api";
import { send } from "../../../../utils/sockjs/client-sockjs";

function CardRoom(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [rooms, setRooms] = useState([]);
  const components = useSelector(selectComponents);
  const currentRoom = useSelector(selectCurrentRoom);

  const init = async () => {
    const response = await getRoomsByUserId(user.id);
    const responseOwner = await getRoomByOwner(user.id);

    for (let room of [...response, ...responseOwner]) {
      if (!rooms.find((m) => m.id === room.id)) {
        rooms.push(room);
      }
    }

    setRooms([...rooms]);
  };

  useEffect(() => {
    init();
  }, [components]);

  const handleLeaveRoom = async (e, roomId) => {
    e.preventDefault();
    const response = await leaveRoom(roomId, user.id);
    if (response === "OK") {
      if (roomId === currentRoom.id) {
        window.location.href = "/" + user.roomLink;
      }
      init();
      send(currentRoom.link, { command: "TRIGGER" });
    } else {
      alert("Something wrong");
    }
  };

  return (
    <>
      <CardOption {...props} className={"CardRoom"}>
        <div className="option-bar-header">
          <h4 className="option-bar-title">Phòng họp</h4>
        </div>

        <div className="option-bar-rooms">
          {rooms.map((m) => {
            return (
              <div key={m.id} className="option-bar-room">
                <div className="room-bar-header-content">
                  <i className="fa-solid fa-door-open"></i>
                  <div>
                    <div className="room-content-text">{m.title}</div>
                    <p style={{ fontSize: "12px", color: "#666" }}>
                      {m.owner.email}
                    </p>
                  </div>
                </div>
                <div className="room-bar-header-time">
                  <a style={{ fontSize: "12px" }} href={"/" + m.link}>
                    Vào phòng
                  </a>
                  {m.owner.id !== user.id && (
                    <a
                      style={{ fontSize: "12px", color: "red" }}
                      onClick={(e) => handleLeaveRoom(e, m.id)}
                    >
                      Rời
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardOption>
    </>
  );
}

export default CardRoom;
