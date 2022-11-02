import CardOption from "./CardOption";
import "./css/CardUserOption.css";
import { API_URL } from "../../../../api/common-api";
import { USER_DEFAULT_IMAGE } from "../../../../utils/image-utils";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateUser } from "../../../../store/user-slice";
import { useRef, useState } from "react";
import { updateUserImage } from "../../../../api/users-api";
import { disconnect } from "../../../../utils/sockjs/client-sockjs";
import ModalAccountSetting from "../../modal/ModalAccountSetting";

function CardUserOption(props) {
  const user = useSelector(selectUser);
  const dispath = useDispatch();
  const hiddenImageFile = useRef(null);
  const imagePreview = useRef(null);

  const [modalReplace, setModalReplace] = useState(<></>);

  const openFileChooser = () => {
    hiddenImageFile.current.click();
  };

  const onImageChange = async (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();

    const formData = new FormData();
    formData.append("imageFile", file);

    const response = await updateUserImage(user.id, formData);
    localStorage.setItem("user", JSON.stringify(response));
    dispath(updateUser(response));

    fileReader.onload = (e) => {
      imagePreview.current.src = e.target.result;
    };

    fileReader.readAsDataURL(file);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("jwt-token");
    disconnect();
    window.location.href = "/sign-in";
  };

  const openModalAccount = (e) => {
    e.stopPropagation();
    setModalReplace(
      <ModalAccountSetting
        isOpen={true}
        onClose={(e) => {
          setModalReplace(<></>);
        }}
      />
    );
  };

  return (
    <>
      {user && (
        <CardOption width="350px" {...props}>
          <div className="option-bar-header">
            <div className="user-bar-header-content">
              <h4 className="user-bar-name">
                {user.firstName} {user.lastName}
              </h4>
              <p className="user-bar-email">{user.email}</p>
              <div className="user-content-contain-features">
                <button
                  className="button-transparent"
                  onClick={openModalAccount}
                >
                  Account settings
                </button>
                <button className="button-transparent" onClick={logout}>
                  Log out
                </button>
              </div>
            </div>
            <div className="user-bar-header-avatar">
              <img
                ref={imagePreview}
                src={API_URL + "/" + (user.avatar ?? USER_DEFAULT_IMAGE)}
                alt=""
              />
              <button className="button-transparent" onClick={openFileChooser}>
                Change
              </button>
              <input
                ref={hiddenImageFile}
                type="file"
                style={{ display: "none" }}
                accept={"image/png, image/jpeg"}
                onChange={onImageChange}
              />
            </div>
          </div>
          {modalReplace}
        </CardOption>
      )}
    </>
  );
}

export default CardUserOption;
