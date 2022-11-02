import CardOption from "./CardOption";
import "./css/CardNotificationOption.css";
import UserRound from "./UserRound";

function CardNotification(props) {
  return (
    <>
      <CardOption {...props} className={"CardNotification"}>
        <div className="option-bar-header">
          <h4 className="option-bar-title">Thông báo</h4>
        </div>

        <div className="option-bar-notifications">
          <div className="option-bar-notification">
            <div className="notification-bar-header-content">
              <UserRound />
              <div className="notification-content-text">
                thanhnhahuynh has changed something
              </div>
            </div>
            <div className="notification-bar-header-time">
              <p>22-10-2022</p>
            </div>
          </div>
        </div>
      </CardOption>
    </>
  );
}

export default CardNotification;
