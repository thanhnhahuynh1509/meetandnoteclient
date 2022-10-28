import "./css/CardOption.css";

function CardOption(props) {
  const { isOpen, onClose } = props;
  return (
    <>
      {isOpen && <div className="backdrop" onClick={onClose}></div>}
      <div className={props.className + " CardOption " + `${isOpen && "show"}`}>
        {props.children}
      </div>
    </>
  );
}

export default CardOption;
