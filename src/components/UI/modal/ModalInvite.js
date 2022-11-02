import ModalWorkspace from "./ModalWorkspace";
import "./css/ModalInvite.css";

function ModalInvite(props) {
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
              <input type="text" placeholder="Nhập email..." />
              <button className="button">Gửi lời mời</button>
            </div>
          </div>

          <div className="contain-form">
            <p className="title">Mời thành viên qua email (Full permission)</p>
            <div className="form-button">
              <input type="text" placeholder="Nhập email..." />
              <button className="button">Gửi lời mời</button>
            </div>
          </div>
        </div>
      </ModalWorkspace>
    </>
  );
}

export default ModalInvite;
