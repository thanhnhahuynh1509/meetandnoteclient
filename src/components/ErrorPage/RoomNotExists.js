import "./css/AuthorizePage.css";

function RoomNotExists(props) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="AuthorizePage">
      <h1>Lỗi!</h1>
      <p>Phòng không tồn tại</p>
      <a href="/">Trang chủ</a>
      <a href={"/" + user.roomLink}>Quay lại phòng của bạn</a>
    </div>
  );
}

export default RoomNotExists;
