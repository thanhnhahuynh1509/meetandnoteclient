import CardOption from "./CardOption";
import "./css/CardParticipant.css";
import UserRound from "./UserRound";
import { useState, useEffect } from "react";
import {
  getUsersByRoomId,
  updateUserPermission,
} from "../../../../api/users-api";
import { useSelector } from "react-redux";
import { selectCurrentRoom } from "../../../../store/room-slice";
import { send } from "../../../../utils/sockjs/client-sockjs";
import { useParams } from "react-router-dom";

function CardParticipant(props) {
  const [participants, setParticipants] = useState([]);
  const currentRoom = useSelector(selectCurrentRoom);
  const user = JSON.parse(localStorage.getItem("user"));
  const { roomId } = useParams();

  useEffect(() => {
    const init = async () => {
      const response = await getUsersByRoomId(currentRoom.id);
      setParticipants(response);
    };

    init();
  }, []);

  const handleOnChange = async (userId) => {
    const response = await updateUserPermission(userId, currentRoom.id);
    send(roomId, { command: "PERMISSION", userId });
  };

  return (
    <>
      <CardOption {...props} className={"CardParticipant"}>
        <div className="option-bar-header">
          <h4 className="option-bar-title">Thành viên</h4>
        </div>

        <div className="option-bar-participants">
          {participants.map((m) => {
            return (
              <div key={m.id} className="option-bar-participant">
                <div className="participant-bar-header-content">
                  <UserRound avatar={m.avatar} />
                  <div className="participant-content-text">
                    {m.firstName} {m.lastName}{" "}
                    {m.id === currentRoom.owner.id && "(Chủ phòng)"}
                  </div>
                </div>
                <div className="participant-bar-header-time">
                  {user.id === currentRoom.owner.id && user.id !== m.id && (
                    <>
                      <input
                        type="checkbox"
                        id={m.id}
                        defaultChecked={m.fullPermission}
                        onChange={() => handleOnChange(m.id)}
                      />{" "}
                      <label htmlFor={m.id}>Full</label>
                    </>
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

export default CardParticipant;
