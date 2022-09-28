import "./css/FormGroup.css";

function FormGroup(props) {
  return (
    <>
      <div className="form-group FormGroup">
        <input type={props.type} placeholder=" " required />
        <label>{props.placeholder}</label>
      </div>
    </>
  );
}

export default FormGroup;
