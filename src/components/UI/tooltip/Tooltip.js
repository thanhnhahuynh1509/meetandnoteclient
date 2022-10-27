import "./css/Tooltip.css";

function Tooltip(props) {
  return (
    <div className="Tooltip">
      <p className="Tooltip-content">{props.children}</p>
    </div>
  );
}

export default Tooltip;
