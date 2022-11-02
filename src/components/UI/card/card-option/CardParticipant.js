import CardOption from "./CardOption";
import "./css/CardParticipant.css";
import UserRound from "./UserRound";

function CardParticipant(props) {
  return (
    <>
      <CardOption {...props} className={"CardParticipant"}>
        <div className="option-bar-header">
          <h4 className="option-bar-title">Thành viên</h4>
        </div>

        <div className="option-bar-participants">
          <div className="option-bar-participant">
            <div className="participant-bar-header-content">
              <UserRound />
              <div className="participant-content-text">Thanh Nha Huynh</div>
            </div>
            <div className="participant-bar-header-time">
              <p>online</p>
            </div>
          </div>
        </div>
      </CardOption>
    </>
  );
}

export default CardParticipant;
