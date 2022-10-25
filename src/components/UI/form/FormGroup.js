import "./css/FormGroup.css";

function FormGroup(props) {
  const handleChange = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <>
      <div className="form-group FormGroup">
        <input
          type={props.type}
          placeholder=" "
          required={props.required}
          onChange={handleChange}
        />
        <label>{props.placeholder}</label>
      </div>
    </>
  );
}

export default FormGroup;
