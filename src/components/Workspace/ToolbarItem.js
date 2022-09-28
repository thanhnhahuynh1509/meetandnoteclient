import ToolItemCard from "./ToolItemCard";
import { useDispatch, useSelector } from "react-redux";
import { addComponent } from "../../store/component-slice";
import { selectStartContent } from "./../../store/screen-additional-space";
import { v4 } from "uuid";

function ToolbarItem(props) {
  const dispatch = useDispatch();
  const startContentPos = useSelector(selectStartContent);

  const handleDragEnd = (e) => {
    if (e.pageX < startContentPos) return;
    const component = {
      id: v4(),
      posX: Math.round(e.pageX),
      posY: Math.round(e.pageY),
      type: props.type,
    };
    dispatch(addComponent(component));
  };

  return (
    <>
      <li className="toolbar-item" draggable={true} onDragEnd={handleDragEnd}>
        <ToolItemCard icon={props.icon} title={props.title} />
      </li>
    </>
  );
}

export default ToolbarItem;
