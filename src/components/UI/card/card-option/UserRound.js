import "./css/UserRound.css";

function UserRound(props) {
  let { size } = props;
  if (!size) {
    size = 40;
  }
  return (
    <>
      <div className="UserRound">
        <img
          src="https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/280109609_3121034704880165_6664039898340461523_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=gpKoiHkv4l0AX-leWM4&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfDET0wYavAz4xOOdcldZL_zZQp7HmG30pC5hlnxT-y5oA&oe=635F7D2E"
          alt=""
          style={{ width: size, height: size }}
        />
        <div className="UserRound-status"></div>
      </div>
    </>
  );
}

export default UserRound;
