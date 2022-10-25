import "../UI/form/css/Form.css";
import CardForm from "./../UI/form/CardForm";
import Button from "./../UI/button/Button";
import FormGroup from "./../UI/form/FormGroup";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signIn } from "../../api/sign-in-up-api";
import { useDispatch } from "react-redux";
import { updateModal } from "../../store/modal-slice";
import { getUserByToken } from "./../../api/users-api";

function LoginForm(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };

    setDisable(true);
    try {
      const token = await signIn(user);
      localStorage.setItem("jwt-token", token);
      const userResponse = await getUserByToken(token);
      localStorage.setItem("user", JSON.stringify(userResponse));
      navigate(`/${userResponse.roomLink}`, { replace: true });
    } catch (exception) {
      console.log(exception);
      let message = "Server is not running";

      try {
        message = exception.response.data.message;
      } catch (ex) {}
      dispatch(
        updateModal({
          icon: (
            <i
              className="fa-regular fa-circle-xmark"
              style={{ color: "red" }}
            ></i>
          ),
          title: "Oop!",
          hide: false,
          text: message,
          buttonConfirmText: "OK",
        })
      );
    }
    setDisable(false);
  };
  return (
    <div className="LoginForm Form">
      <CardForm title={"Sign In"}>
        <form action="#" className="Form-form" onSubmit={handleSubmit}>
          <FormGroup
            type="email"
            placeholder="Email"
            required={true}
            value={email}
            onChange={setEmail}
          />
          <FormGroup
            type="password"
            placeholder="Password"
            required={true}
            value={password}
            onChange={setPassword}
          />

          <div className="Form-contain-buttons">
            <Button color="#1a77f2">
              <i className="fa-brands fa-facebook button-login-by-icon"></i>
            </Button>
            <Button color="#f47373">
              <i className="fa-brands fa-google button-login-by-icon"></i>
            </Button>
            <Button color="#333">
              <i className="fa-brands fa-apple button-login-by-icon"></i>
            </Button>
          </div>

          <div className="form-group-checkbox">
            <input type="checkbox" id="check" />
            <label htmlFor="check">Remember Me</label>
          </div>

          <button className="button-login" disabled={disable}>
            {!disable && (
              <i className="fa-solid fa-arrow-right button-login-icon"></i>
            )}
            {disable && <div className="waiting"></div>}
          </button>
        </form>

        <div className="Form-contain-more-features">
          <Link to={"/sign-in"} className="feature">
            Can't sign in?
          </Link>
          <Link to={"/sign-up"} className="feature">
            Create new account
          </Link>
        </div>
      </CardForm>
    </div>
  );
}

export default LoginForm;
