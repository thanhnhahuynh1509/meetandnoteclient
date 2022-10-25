import "./css/RegisterForm.css";
import "../UI/form/css/Form.css";
import CardForm from "../UI/form/CardForm";
import FormGroup from "./../UI/form/FormGroup";
import Button from "./../UI/button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateModal } from "../../store/modal-slice";
import { signUp } from "../../api/sign-in-up-api";

function RegisterForm(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [disable, setDisable] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!acceptPolicy) {
      dispatch(
        updateModal({
          icon: (
            <i
              className="fa-regular fa-circle-question"
              style={{ color: "yellow" }}
            ></i>
          ),
          title: "Forgot something?",
          hide: false,
          text: "Please accept the policy and secure",
          buttonConfirmText: "OK",
        })
      );
      return;
    }

    setDisable(true);
    try {
      const user = {
        email,
        password,
        firstName,
        lastName,
      };

      await signUp(user);

      // show modal
      dispatch(
        updateModal({
          icon: (
            <i
              className="fa-regular fa-circle-check"
              style={{ color: "green" }}
            ></i>
          ),
          title: "Congratulations!",
          hide: false,
          text: "Welcome to Meet&Note. Sign-in now",
          buttonConfirmText: "OK",
        })
      );

      navigate("/sign-in", { replace: true });
    } catch (exception) {
      let message = "Server is not running!";
      try {
        message = exception.response.data.message;
      } catch (ex) {}

      // show modal
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
    <>
      <div className="RegisterForm Form">
        <CardForm title={"Sign Up"}>
          <form action="#" className="Form-form" onSubmit={handleSubmit}>
            <div className="RegisterForm-group">
              <FormGroup
                type="text"
                placeholder="First Name"
                required={true}
                onChange={setFirstName}
              />
              <FormGroup
                type="text"
                placeholder="Last Name"
                required={true}
                onChange={setLastName}
              />
            </div>
            <FormGroup
              type="email"
              required={true}
              placeholder="Email"
              onChange={setEmail}
            />
            <FormGroup
              type="password"
              placeholder="Password"
              required={true}
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
              <input
                type="checkbox"
                id="check"
                onChange={() => {
                  setAcceptPolicy(!acceptPolicy);
                }}
              />
              <label htmlFor="check">
                I agree with{" "}
                <strong>
                  <a href="">policy</a>
                </strong>{" "}
                and{" "}
                <strong>
                  <a href="">secure</a>
                </strong>{" "}
                of <strong>Meet&Note</strong>
              </label>
            </div>

            <button
              className={`button-login ${disable && `button-disable`}`}
              disabled={disable}
            >
              {!disable && (
                <i className="fa-solid fa-arrow-right button-login-icon"></i>
              )}
              {disable && <div className="waiting"></div>}
            </button>
          </form>

          <div className="Form-contain-more-features">
            <Link to={"/sign-in"} className="feature">
              Turn back sign in page
            </Link>
          </div>
        </CardForm>
      </div>
    </>
  );
}

export default RegisterForm;
