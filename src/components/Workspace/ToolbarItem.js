import ToolItemCard from "./ToolItemCard";
import { useDispatch, useSelector } from "react-redux";
import {
  addComponent,
  removeComponent,
  selectCurrentComponent,
  updateComponent,
} from "../../store/component-slice";
import { selectStartContent } from "./../../store/screen-additional-space";
import { v4 } from "uuid";
import { send } from "../../utils/sockjs/client-sockjs";
import { selectCurrentRoom } from "../../store/room-slice";
import { saveRoom } from "../../api/room-api";
import { getLastIDComponent, saveComponent } from "../../api/component-api";
import { getLastIDRoom } from "../../api/room-api";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import {
  selectLastIDRoom,
  selectLastIDComponent,
  updateLastComponentID,
  updateLastRoomID,
} from "../../store/utils-slice";

function ToolbarItem(props) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const startContentPos = useSelector(selectStartContent);
  const currentRoom = useSelector(selectCurrentRoom);
  const fileHiddenRef = useRef(null);
  const { roomId } = useParams();
  // const lastIDRoom = useSelector(selectLastIDRoom);
  // const lastIDComponent = useSelector(selectLastIDComponent);

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

      // dispatch(updateLastRoomID(lastIDRoom + 1));
    } else {
      component.attribute = {
        content: "",
        color: "#ffffff",
        title: "",
      };

      const response = await saveComponent(component);
      dispatch(updateComponent(response));
      send(roomId, response);

      // dispatch(updateLastComponentID(lastIDComponent + 1));
    }
  };

  const handleClick = async (e) => {
    if (props.type === "FILE") {
      fileHiddenRef.current.click();
    }
  };

  return (
    <>
      <li
        className={`toolbar-item ${props.active && "active"}`}
        draggable={props.isDrag ?? true}
        onDragEnd={handleDragEnd}
        onClick={handleClick}
      >
        <ToolItemCard icon={props.icon} title={props.title} />
      </li>
      <input type="file" style={{ display: "none" }} ref={fileHiddenRef} />
    </>
  );
}

ToolbarItem.defaultProps = {
  active: true,
};

export default ToolbarItem;
