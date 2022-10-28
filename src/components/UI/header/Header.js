import { useState } from "react";
import Button from "../button/Button";
import Tooltip from "../tooltip/Tooltip";
import "./css/Header.css";

function Header(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
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
            <button className="Header-button button-transparent tooltip-parent">
              <i className="fa-solid fa-bell"></i>
              <Tooltip>Thông báo</Tooltip>
            </button>
            <button className="Header-button button-transparent tooltip-parent">
              <i className="fa-solid fa-gear"></i>
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
