import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentComponent,
} from "../../store/component-slice";
import "./css/ToolbarAdditionalFeature.css";
import "./css/ToolbarAdditionalColor.css";
import ToolItemCard from "./ToolItemCard";
import { useRef, useState } from "react";

function ToolbarAdditionalColor(props) {
  const dispatch = useDispatch();
  const currentComponent = useSelector(selectCurrentComponent);
  const [color, setColor] = useState(currentComponent.attribute.color);
  const colorFileHidden = useRef(null);

  const handleOnClick = (e) => {
    e.stopPropagation();
    colorFileHidden.current.click();
  };

  return (
    <>
      <li  className="ToolbarAdditionalFeature ToolbarAdditionalColor" onClick={handleOnClick}>
        <ToolItemCard style={{boxShadow: "inset 0 3px 0 " + color}} icon={props.icon} title={props.title} />
        <input className="color-input" ref={colorFileHidden} type="color" value={color} onChange={(e) => setColor(e.target.value)}/>
      </li>
    </>
  );
}

export default ToolbarAdditionalColor;