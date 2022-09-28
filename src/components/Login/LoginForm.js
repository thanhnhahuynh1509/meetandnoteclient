import "../UI/form/css/Form.css";
import CardForm from "./../UI/form/CardForm";
import Button from "./../UI/button/Button";
import FormGroup from "./../UI/form/FormGroup";
import { Link } from "react-router-dom";

function LoginForm(props) {
  return (
    <div className="LoginForm Form">
      <CardForm title={"Đăng nhập"}>
        <form action="#" className="Form-form">
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
            <label htmlFor="check">Lưu đăng nhập</label>
          </div>

          <button className="button-login">
            <i className="fa-solid fa-arrow-right button-login-icon"></i>
          </button>
        </form>

        <div className="Form-contain-more-features">
          <Link to={"/sign-in"} className="feature">
            Không thể đăng nhập?
          </Link>
          <Link to={"/sign-up"} className="feature">
            Tạo tài khoản
          </Link>
        </div>
      </CardForm>
    </div>
  );
}

export default LoginForm;
