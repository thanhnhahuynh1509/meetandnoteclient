import "./css/ModalAccountSetting.css";
import ModalWorkspace from "./ModalWorkspace";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateUser } from "../../../store/user-slice";
import { useState } from "react";
import { updateUserInfo } from "../../../api/users-api";

function ModalAccountSetting(props) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...user, firstName: firstName, lastName: lastName };
    const response = await updateUserInfo(user.id, data);
    localStorage.setItem("user", JSON.stringify(response));
    dispatch(updateUser(response));
    props.onClose();
  };

  return (
    <>
      <ModalWorkspace {...props} className="ModalAccountSetting" width="400px">
        <div className="ModalAccountSetting-container">
          <h4 className="title">Cài đặt tài khoản</h4>
          <p className="description"></p>

          <form action="" onSubmit={handleSubmit}>
            <div className="contain-form-group">
              <div className="contain-form">
                <p className="title">Họ</p>
                <div className="form-button">
                  <input
                    value={lastName}
                    type="text"
                    placeholder=""
                    required
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="contain-form">
                <p className="title">Tên</p>
                <div className="form-button">
                  <input
                    value={firstName}
                    type="text"
                    placeholder=""
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <button className="button button-submit">Lưu</button>
          </form>

          <div className="contain-form">
            <p className="title">Mật khẩu</p>
            <div className="form-button">
              <input
                defaultValue={"*************"}
                type="password"
                placeholder=""
                disabled={true}
              />
              <button className="bg-red button">Thay đổi</button>
            </div>
          </div>
        </div>
      </ModalWorkspace>
    </>
  );
}

export default ModalAccountSetting;
