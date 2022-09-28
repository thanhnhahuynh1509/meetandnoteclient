import "./css/CardForm.css";

function CardForm(props) {
  return (
    <div className="CardForm">
      <div className="CardForm">
        <div className="CardForm-show">
          <h2 className="CardForm-title">{props.title}</h2>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default CardForm;
