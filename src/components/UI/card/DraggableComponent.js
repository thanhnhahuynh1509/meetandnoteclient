import Draggable from "react-draggable";
import Note from "./Note";
import { useDispatch, useSelector } from "react-redux";
import { addSpace } from "../../../store/screen-additional-space";
import { useEffect, useState } from "react";
import {
  selectComponents,
  updateComponent,
} from "../../../store/component-slice";
import Link from "./Link";
import { send } from "../../../utils/sockjs/client-sockjs";
import Todo from "./Todo";
import Room from "./Room";
import { updateRoomPosition } from "../../../api/room-api";
import { updateComponentPosition } from "../../../api/component-api";

const spaceAddition = 200;

function DraggableComponent(props) {
  const dispatch = useDispatch();
  const { parentRef, content } = props;
  const user = JSON.parse(localStorage.getItem("user"));

  const [disable, setDisable] = useState(false);
  const [position, setPosition] = useState({ ...props.position });

  const parentPos = parentRef.current.getBoundingClientRect();

  const parentBoundX = parentPos.width;
  const parentBoundY = parentPos.height;

  const handleBoundX = () => {
    const spaceX = Math.round(parentBoundX - spaceAddition);
    if (position.x + spaceAddition >= spaceX) {
      dispatch(
        addSpace({
          width: position.x + spaceAddition - spaceX + spaceAddition,
          height: 0,
        })
      );
    }
  };

  const handleBoundY = () => {
    const spaceY = Math.round(parentBoundY - spaceAddition / 2);

    if (position.y + spaceAddition >= spaceY) {
      dispatch(
        addSpace({
          width: 0,
          height: position.y + spaceAddition - spaceY + spaceAddition,
        })
      );
    }
  };

  useEffect(() => {
    setPosition({ x: content.posX, y: content.posY });
    handleBoundX();
    handleBoundY();
  }, [content]);

  const handleOnStop = async (e, data) => {
    setPosition({ x: data.x, y: data.y });
    const component = { ...content, posX: data.x, posY: data.y };
    dispatch(updateComponent(component));

    if (component.type === "ROOM") {
      const response = await updateRoomPosition(component);
    } else {
      const response = await updateComponentPosition(component);
    }

    send(user.roomLink, component);
  };

  return (
    <Draggable
      position={{ x: position.x, y: position.y }}
      bounds={"parent"}
      onStop={handleOnStop}
      disabled={disable}
      cancel="input"
    >
      <div>
        {content.type === "NOTE" && (
          <Note setDisable={setDisable} content={content} />
        )}
        {content.type === "LINK" && (
          <Link setDisable={setDisable} content={content} />
        )}
        {content.type === "TODO" && (
          <Todo setDisable={setDisable} content={content} />
        )}
        {content.type === "COMMENT" && <></>}
        {content.type === "ROOM" && (
          <Room setDisable={setDisable} content={content} />
        )}
      </div>
    </Draggable>
  );
}

export default DraggableComponent;
