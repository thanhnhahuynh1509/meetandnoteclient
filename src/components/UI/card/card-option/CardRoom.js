import CardOption from "./CardOption";
import UserRound from "./UserRound";
import "./css/CardRoom.css";
import { useEffect, useState } from "react";
import { getRoomByOwner, getRoomsByUserId } from "../../../../api/room-api";
import { useSelector } from "react-redux";
import { selectComponents } from "../../../../store/component-slice";

function CardRoom(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [rooms, setRooms] = useState([]);
  const components = useSelector(selectComponents);

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
    console.log("run");
    init();
  }, [components]);

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
                    Enter room
                  </a>
                  {m.owner.id !== user.id && (
                    <a
                      style={{ fontSize: "12px", color: "red" }}
                      href={"/" + m.link}
                    >
                      Leave
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
