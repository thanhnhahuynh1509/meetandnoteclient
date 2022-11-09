import "./css/AuthorizePage.css";

function RoomNotExists(props) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="AuthorizePage">
      <h1>Error!</h1>
      <p>The room is not exist</p>
      <a href="/">Home</a>
      <a href={"/" + user.roomLink}>Turn back your room</a>
    </div>
  );
}

export default RoomNotExists;
