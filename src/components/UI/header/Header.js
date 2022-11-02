import { useState } from "react";
import CardUserOption from "../card/card-option/CardUserOption";
import Tooltip from "../tooltip/Tooltip";
import "./css/Header.css";
import CardNotification from "../card/card-option/CardNotificationOption";
import CardParticipant from "../card/card-option/CardParticipant";
import CardChat from "../card/card-option/CardChat";
import ModalInvite from "../modal/ModalInvite";
import ModalVideo from "../modal/ModalVideo";

function Header(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [openOptionUser, setOpenOptionUser] = useState(false);
  const [openOptionNotification, setOpenOptionNotification] = useState(false);
  const [openOptionParticipant, setOpenOptionParticipant] = useState(false);
  const [openOptionChat, setOpenOptionChat] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const [placeForModal, setPlaceForModal] = useState(<></>);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const setOpenUser = (value) => {
    setOpenOptionUser(value);
  };

  const setOpenNotification = (value) => {
    setOpenOptionNotification(value);
  };

  const setOpenParticipant = (value) => {
    setOpenOptionParticipant(value);
  };

  const setOpenChat = (value) => {
    setOpenOptionChat(value);
  };

  const openModalShare = () => {
    setPlaceForModal(
      <ModalInvite isOpen={true} onClose={() => setPlaceForModal(<></>)} />
    );
  };

  const openModalVideo = () => {
    setPlaceForModal(
      <ModalVideo isOpen={true} onClose={() => setPlaceForModal(<></>)} />
    );
  };

  return (
    <>
      <div className={"Header " + `${isOpen && "show"}`}>
        <div className="Header-container">
          <div className="Header-contain-features">
            <div className="Header-contain-navigate">
              <ul className="Header-navigate-items">
                <li
                  className="Header-navigate-item"
                  onClick={() => (window.location.href = "/" + user.roomLink)}
                >
                  Home
                </li>
                <li className="Header-navigate-item">Đồ án chuyên ngành</li>
              </ul>
            </div>

            <div className="Header-contain-buttons">
              <button
                className="Header-button button-transparent tooltip-parent"
                onClick={setOpenNotification}
              >
                <i className="fa-solid fa-bell"></i>
                <CardNotification
                  isOpen={openOptionNotification}
                  onClose={(e) => {
                    e.stopPropagation();
                    setOpenOptionNotification(false);
                  }}
                />
                <Tooltip>Thông báo</Tooltip>
              </button>
              <div
                className="Header-button button-transparent tooltip-parent"
                onClick={() => setOpenUser(true)}
              >
                <i className="fa-solid fa-gear"></i>
                <CardUserOption
                  isOpen={openOptionUser}
                  onClose={(e) => {
                    if (e) e.stopPropagation();
                    setOpenUser(false);
                  }}
                />
                <Tooltip>Cài đặt</Tooltip>
              </div>
            </div>
          </div>

          <div className="Header-contain-content">
            <div className="Header-content-space"></div>
            <div className="Header-content-title">
              <h3>Đồ án chuyên ngành</h3>
            </div>
            <div className="Header-content-features">
              <div className="Header-contain-buttons">
                <button
                  className="button bg-black-blue"
                  onClick={() => openModalShare()}
                >
                  Share
                </button>

                <button
                  className="Header-button button-transparent tooltip-parent"
                  onClick={() => setOpenParticipant(true)}
                >
                  <i className="fa-solid fa-user-group"></i>
                  <CardParticipant
                    isOpen={openOptionParticipant}
                    onClose={(e) => {
                      e.stopPropagation();
                      setOpenParticipant(false);
                    }}
                  />
                  <Tooltip>Thành viên</Tooltip>
                </button>
                <div
                  className="Header-button button-transparent tooltip-parent"
                  onClick={() => setOpenChat(true)}
                >
                  <i className="fa-solid fa-message"></i>
                  <CardChat
                    isOpen={openOptionChat}
                    onClose={(e) => {
                      e.stopPropagation();
                      setOpenChat(false);
                    }}
                  />
                  <Tooltip>Tin nhắn</Tooltip>
                </div>
                <div
                  className="Header-button button-transparent tooltip-parent"
                  onClick={() => openModalVideo()}
                >
                  <i className="fa-solid fa-video"></i>
                  <Tooltip>Gọi Video</Tooltip>
                </div>
              </div>
            </div>
          </div>

          <div className="Header-contain-toggle">
            <div
              onClick={toggleOpen}
              className="button-circle Header-button-toggle"
            >
              <i className={`fa-solid fa-caret-${isOpen ? "up" : "down"}`}></i>
            </div>
          </div>
        </div>
      </div>
      {placeForModal}
    </>
  );
}

export default Header;
