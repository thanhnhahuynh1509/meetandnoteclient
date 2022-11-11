import ModalWorkspace from "./ModalWorkspace";
import "./css/ModalInvite.css";
import { useSelector } from "react-redux";
import { selectCurrentRoom } from "../../../store/room-slice";
import { inviteUser } from "../../../api/room-api";
import { useState } from "react";
import { send } from "../../../utils/sockjs/client-sockjs";

function ModalInvite(props) {
  const [emailReadOnly, setEmailReadOnly] = useState("");
  const [emailFullPermission, setEmailFullPermission] = useState("");

  const currentRoom = useSelector(selectCurrentRoom);

  const handleOnSend = async (email, permission, callBackClear) => {
    if (email) {
      const response = await inviteUser(currentRoom.id, email, permission);
      console.log(response);
      if (response === "EXISTS") {
        alert("Người dùng đã được mời");
      } else if (response === "NOT OK") {
        alert("Người dùng không tồn tại");
      } else if (response === "BAD REQUEST") {
        alert("LỖI SERVER");
      } else if (response === "OK") {
        alert("Thành công");
        callBackClear("");
        send(currentRoom.link, { command: "TRIGGER" });
      }
    } else {
      alert("Email không hợp lệ");
    }
  };

  return (
    <>
      <ModalWorkspace {...props} className="ModalInvite" width="400px">
        <div className="ModalInvite-container">
          <h4 className="title">Thêm thành viên</h4>
          <p className="description">
            Bạn có thể thêm thành viên mới và phân quyền cho họ.
          </p>

          <div className="contain-form">
            <p className="title">Mời thành viên qua email (Read-only)</p>
            <div className="form-button">
              <input
                type="text"
                placeholder="Nhập email..."
                value={emailReadOnly}
                onChange={(e) => setEmailReadOnly(e.target.value)}
              />
              <button
                className="button"
                onClick={() =>
                  handleOnSend(emailReadOnly, "READ", setEmailReadOnly)
                }
              >
                Send
              </button>
            </div>
          </div>

          <div className="contain-form">
            <p className="title">Mời thành viên qua email (Full permission)</p>
            <div className="form-button">
              <input
                type="text"
                placeholder="Nhập email..."
                value={emailFullPermission}
                onChange={(e) => setEmailFullPermission(e.target.value)}
              />
              <button
                className="button"
                onClick={() =>
                  handleOnSend(
                    emailFullPermission,
                    "FULL",
                    setEmailFullPermission
                  )
                }
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </ModalWorkspace>
    </>
  );
}

export default ModalInvite;
