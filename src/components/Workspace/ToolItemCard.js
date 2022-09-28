import "./css/ToolItemCard.css";

function ToolItemCard(props) {
  return (
    <>
      <div className="ToolItemCard">
        <i className={props.icon + " toolbar-item-icon"}></i>
        <span>{props.title}</span>
      </div>
    </>
  );
}

export default ToolItemCard;
