import "./css/AuthorizePage.css";

function AuthorizePage(props) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="AuthorizePage">
      <h1>Error!</h1>
      <p>You not have any permission in this room</p>
      <a href="/">Home</a>
      <a href={"/" + user.roomLink}>Turn back your room</a>
    </div>
  );
}

export default AuthorizePage;
