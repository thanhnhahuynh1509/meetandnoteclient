import "./css/UserRound.css";
import { API_URL } from "../../../../api/common-api";

function UserRound(props) {
  let { size } = props;
  if (!size) {
    size = 40;
  }
  return (
    <>
      <div className="UserRound">
        <img
          src={API_URL + "/" + props.avatar}
          alt=""
          style={{ width: size, height: size }}
        />
        <div className="UserRound-status"></div>
      </div>
    </>
  );
}

export default UserRound;
