import "./css/Header.css";

function Header(props) {
  return (
    <>
      <header className="header">
        <div className="container">
          <nav className="navbar">
            <div className="nav_contain_logo">
              <h2 className="nav_logo">Meet&Note</h2>
            </div>
            <span className="nav_instruction">
              How people use <strong>Meet&Note</strong>
            </span>
            <div className="header_contain_button">
              <button
                className="button_home button_outline_default"
                onClick={props.signIn}
              >
                Log In
              </button>
              <button
                className="button_home button_primary"
                onClick={props.signUp}
              >
                Sign Up For Free
              </button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
