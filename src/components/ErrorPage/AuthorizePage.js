import "./css/AuthorizePage.css";

function AuthorizePage(props) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="AuthorizePage">
      <h1>Lỗi!</h1>
      <p>Bạn không có quyền để vào phòng</p>
      <a href="/">Trang chủ</a>
      <a href={"/" + user.roomLink}>Quay lại phòng của bạn</a>
    </div>
  );
}

export default AuthorizePage;
