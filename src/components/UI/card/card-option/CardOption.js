import "./css/CardOption.css";

function CardOption(props) {
  const { isOpen, onClose } = props;
  return (
    <>
      {isOpen && <div className="backdrop" onClick={onClose}></div>}
      <div
        className={props.className + " CardOption " + `${isOpen && "show"}`}
        style={{ minWidth: props.width }}
      >
        {props.children}
      </div>
    </>
  );
}

export default CardOption;
