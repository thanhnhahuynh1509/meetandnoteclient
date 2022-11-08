import CardOption from "./CardOption";
import "./css/CardParticipant.css";
import UserRound from "./UserRound";
import { useState, useEffect } from "react";
import { getUsersByRoomId } from "../../../../api/users-api";
import { useSelector } from "react-redux";
import { selectCurrentRoom } from "../../../../store/room-slice";

function CardParticipant(props) {
  const [participants, setParticipants] = useState([]);
  const currentRoom = useSelector(selectCurrentRoom);

  useEffect(() => {
    const init = async () => {
      const response = await getUsersByRoomId(currentRoom.id);
      setParticipants(response);
    };

    init();
  }, []);

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
                    {m.firstName} {m.lastName}
                  </div>
                </div>
                <div className="participant-bar-header-time">
                  <input type="checkbox" id={m.id} />{" "}
                  <label htmlFor={m.id}>Full</label>
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
