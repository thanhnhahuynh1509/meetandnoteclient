import CardOption from "./CardOption";
import "./css/CardUserOption.css";

function CardUserOption(props) {
  return (
    <>
      <CardOption {...props}>
        <div className="option-bar-header">
          <div className="user-bar-header-content">
            <h4 className="user-bar-name">Nha Huynh</h4>
            <p className="user-bar-email">thanhnhahuynh1509@gmail.com</p>
            <div className="user-content-contain-features">
              <button className="button-transparent">Account settings</button>
              <button className="button-transparent">Log out</button>
            </div>
          </div>
          <div className="user-bar-header-avatar">
            <img
              src="https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/280109609_3121034704880165_6664039898340461523_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=gpKoiHkv4l0AX-leWM4&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfDET0wYavAz4xOOdcldZL_zZQp7HmG30pC5hlnxT-y5oA&oe=635F7D2E"
              alt=""
            />
            <button className="button-transparent">Change</button>
          </div>
        </div>
      </CardOption>
    </>
  );
}

export default CardUserOption;
