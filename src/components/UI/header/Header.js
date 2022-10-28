import { useState } from "react";
import Button from "../button/Button";
import CardUserOption from "../card/card-option/CardUserOption";
import Tooltip from "../tooltip/Tooltip";
import "./css/Header.css";
import CardNotification from "../card/card-option/CardNotificationOption";

function Header(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [openOptionUser, setOpenOptionUser] = useState(false);
  const [openOptionNotification, setOpenOptionNotification] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const setOpenUser = (value) => {
    setOpenOptionUser(value);
  };

  const setOpenNotification = (value) => {
    setOpenOptionNotification(value);
  };

  return (
    <div className={"Header " + `${isOpen && "show"}`}>
      <div className="Header-container">
        <div className="Header-contain-features">
          <div className="Header-contain-navigate">
            <ul className="Header-navigate-items">
              <li className="Header-navigate-item">Home</li>
              <li className="Header-navigate-item">Đồ án chuyên ngành</li>
            </ul>
          </div>

          <div className="Header-contain-buttons">
            <button className="Header-button button-transparent tooltip-parent">
              <i className="fa-solid fa-magnifying-glass"></i>
              <Tooltip>Tìm kiếm</Tooltip>
            </button>
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
            <button
              className="Header-button button-transparent tooltip-parent"
              onClick={() => setOpenUser(true)}
            >
              <i className="fa-solid fa-gear"></i>
              <CardUserOption
                isOpen={openOptionUser}
                onClose={(e) => {
                  e.stopPropagation();
                  setOpenUser(false);
                }}
              />
              <Tooltip>Cài đặt</Tooltip>
            </button>
          </div>
        </div>

        <div className="Header-contain-content">
          <div className="Header-content-space"></div>
          <div className="Header-content-title">
            <h3>Đồ án chuyên ngành</h3>
          </div>
          <div className="Header-content-features">
            <div className="Header-contain-buttons">
              <button className="button bg-black-blue">Share</button>

              <button className="Header-button button-transparent tooltip-parent">
                <i className="fa-solid fa-user-group"></i>
                <Tooltip>Thành viên</Tooltip>
              </button>
              <button className="Header-button button-transparent tooltip-parent">
                <i className="fa-solid fa-message"></i>
                <Tooltip>Tin nhắn</Tooltip>
              </button>
              <button className="Header-button button-transparent tooltip-parent">
                <i className="fa-solid fa-video"></i>
                <Tooltip>Gọi Video</Tooltip>
              </button>
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
  );
}

export default Header;
