import "./css/RegisterForm.css";
import "../UI/form/css/Form.css";
import CardForm from "../UI/form/CardForm";
import FormGroup from "./../UI/form/FormGroup";
import Button from "./../UI/button/Button";
import { Link } from "react-router-dom";

function RegisterForm(props) {
  return (
    <>
      <div className="RegisterForm Form">
        <CardForm title={"Đăng ký"}>
          <form action="#" className="Form-form">
            <div className="RegisterForm-group">
              <FormGroup type="text" placeholder="Tên" />
              <FormGroup type="text" placeholder="Họ" />
            </div>
            <FormGroup type="text" placeholder="Tên đăng nhập" />
            <FormGroup type="password" placeholder="Mật khẩu" />

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
              <label htmlFor="check">
                Tôi đồng ý chính sách và bảo mật của{" "}
                <strong>
                  <italic>Meet&Note</italic>
                </strong>
              </label>
            </div>

            <button className="button-login">
              <i className="fa-solid fa-arrow-right button-login-icon"></i>
            </button>
          </form>

          <div className="Form-contain-more-features">
            <Link to={"/sign-in"} className="feature">
              Quay về trang đăng nhập
            </Link>
          </div>
        </CardForm>
      </div>
    </>
  );
}

export default RegisterForm;
