import "./css/Button.css";

function Button(props) {
  const color = props.color;
  return (
    <button
      className="button-login-by Button"
      style={{ backgroundColor: color }}
    >
      {props.children}
    </button>
  );
}

export default Button;
