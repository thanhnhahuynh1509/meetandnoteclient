import ToolItemCard from "./ToolItemCard";
import { useDispatch, useSelector } from "react-redux";
import { addComponent } from "../../store/component-slice";
import { selectStartContent } from "./../../store/screen-additional-space";
import { v4 } from "uuid";
import { send } from "../../utils/sockjs/client-sockjs";

function ToolbarItem(props) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const startContentPos = useSelector(selectStartContent);

  const handleDragEnd = (e) => {
    if (e.pageX < startContentPos) return;
    const component = {
      id: v4(),
      posX: Math.round(e.pageX - startContentPos),
      posY: Math.round(e.pageY),
      type: props.type,
    };
    dispatch(addComponent(component));

    send(user.roomLink, component);
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
