import CardOption from "./CardOption";
import "./css/CardChat.css";
import UserRound from "./UserRound";

function CardChat(props) {
  return (
    <>
      <CardOption {...props} className={"CardChat"}>
        <div className="option-bar-header">
          <h4 className="option-bar-title">Tin nhắn</h4>
        </div>

        <div className="option-bar-chats">
          <div className="option-bar-chat">
            <div className="chat-bar-header-content">
              <UserRound size={30} />
              <div className="chat-content-text">
                <p style={{ fontWeight: "400" }}>
                  Hi xin chao2 ban toi la Huynh Thanh Nha. Lam xong do an chuyen
                  nganh roi
                </p>
              </div>
            </div>
            <div className="chat-bar-header-time">
              <p>
                22-10-2022 13:00:{" "}
                <strong style={{ marginLeft: "10px" }}>Huynh Thanh Nha</strong>
              </p>
            </div>
          </div>

          <div className="option-bar-chat">
            <div className="chat-bar-header-content">
              <UserRound size={30} />
              <div className="chat-content-text">
                <p style={{ fontWeight: "400" }}>
                  Hi xin chao2 ban toi la Huynh Thanh Nha. Lam xong do an chuyen
                  nganh roi
                </p>
              </div>
            </div>
            <div className="chat-bar-header-time">
              <p>
                22-10-2022 13:00:{" "}
                <strong style={{ marginLeft: "10px" }}>Huynh Thanh Nha</strong>
              </p>
            </div>
          </div>

          <div className="option-bar-chat">
            <div className="chat-bar-header-content">
              <UserRound size={30} />
              <div className="chat-content-text">
                <p style={{ fontWeight: "400" }}>
                  Hi xin chao2 ban toi la Huynh Thanh Nha. Lam xong do an chuyen
                  nganh roi
                </p>
              </div>
            </div>
            <div className="chat-bar-header-time">
              <p>
                22-10-2022 13:00:{" "}
                <strong style={{ marginLeft: "10px" }}>Huynh Thanh Nha</strong>
              </p>
            </div>
          </div>

          <div className="option-bar-chat">
            <div className="chat-bar-header-content">
              <UserRound size={30} />
              <div className="chat-content-text">
                <p style={{ fontWeight: "400" }}>
                  Hi xin chao2 ban toi la Huynh Thanh Nha. Lam xong do an chuyen
                  nganh roi
                </p>
              </div>
            </div>
            <div className="chat-bar-header-time">
              <p>
                22-10-2022 13:00:{" "}
                <strong style={{ marginLeft: "10px" }}>Huynh Thanh Nha</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="option-bar-chat-form">
          <div className="option-bar-form-contains">
            <textarea rows="3"></textarea>
            <button className="button-transparent">
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </CardOption>
    </>
  );
}

export default CardChat;
