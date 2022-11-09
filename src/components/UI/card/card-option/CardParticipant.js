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

function CardParticipant(props) {
  const [participants, setParticipants] = useState([]);
  const currentRoom = useSelector(selectCurrentRoom);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const init = async () => {
      const response = await getUsersByRoomId(currentRoom.id);
      console.log(response);
      setParticipants(response);
    };

    init();
  }, []);

  const handleOnChange = async (userId) => {
    const response = await updateUserPermission(userId, currentRoom.id);
    console.log(response);
  };

  return (
    <>
      <CardOption {...props} className={"CardParticipant"}>
        <div className="option-bar-header">
          <h4 className="option-bar-title">Thành viên</h4>
        </div>

        <div className="option-bar-participants">
          {participants.map((m) => {
            if (m.id === user.id) {
              return <div key={m.id}></div>;
            }
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
                  {user.id === currentRoom.owner.id && (
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
