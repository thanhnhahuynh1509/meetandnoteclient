import ToolItemCard from "./ToolItemCard";
import { useDispatch, useSelector } from "react-redux";
import { updateComponent } from "../../store/component-slice";
import { selectStartContent } from "./../../store/screen-additional-space";
import { send } from "../../utils/sockjs/client-sockjs";
import { selectCurrentRoom } from "../../store/room-slice";
import { saveRoom } from "../../api/room-api";
import { saveComponent } from "../../api/component-api";
import { useParams } from "react-router-dom";

function ToolbarItem(props) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const startContentPos = useSelector(selectStartContent);
  const currentRoom = useSelector(selectCurrentRoom);
  const { roomId } = useParams();

  const handleDragEnd = async (e) => {
    console.log("handle");
    if (e.pageX < startContentPos) return;
    const component = {
      posX: Math.round(e.pageX - startContentPos),
      posY: Math.round(e.pageY),
      parentId: currentRoom.id,
      user: user,
      type: props.type,
    };
    if (component.type === "ROOM") {
      const response = await saveRoom(component);
      dispatch(updateComponent(response));
      send(roomId, response);
    } else {
      component.attribute = {
        content: "",
        color: "#ffffff",
        title: "",
      };

      const response = await saveComponent(component);
      dispatch(updateComponent(response));
      send(roomId, response);
    }
  };

  return (
    <>
      <li
        className={`toolbar-item ${props.active && "active"}`}
        draggable={true}
        onDragEnd={handleDragEnd}
      >
        <ToolItemCard icon={props.icon} title={props.title} />
      </li>
    </>
  );
}

ToolbarItem.defaultProps = {
  active: true,
};

export default ToolbarItem;
