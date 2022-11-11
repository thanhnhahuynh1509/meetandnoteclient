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
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import Upload from "./Upload";

const spaceAddition = 200;

function DraggableComponent(props) {
  const dispatch = useDispatch();
  const { parentRef, content } = props;
  const user = JSON.parse(localStorage.getItem("user"));
  const { roomId } = useParams();

  const [disable, setDisable] = useState(false);
  const [position, setPosition] = useState({ ...props.position });

  const [childrenWidth, setChildrenWidth] = useState(0);
  const [chidrenHeight, setChidrenHeight] = useState(0);

  const parentPos = parentRef.current.getBoundingClientRect();

  const parentBoundX = parentPos.width;
  const parentBoundY = parentPos.height;

  const handleBoundX = () => {
    const spaceX = Math.round(parentBoundX - spaceAddition);
    if (position.x + spaceAddition + childrenWidth >= spaceX) {
      dispatch(
        addSpace({
          width:
            position.x + spaceAddition + childrenWidth - spaceX + spaceAddition,
          height: 0,
        })
      );
    }
  };

  const handleBoundY = () => {
    const spaceY = Math.round(parentBoundY - spaceAddition / 2);

    if (position.y + spaceAddition + chidrenHeight >= spaceY) {
      dispatch(
        addSpace({
          width: 0,
          height:
            position.y + spaceAddition + chidrenHeight - spaceY + spaceAddition,
        })
      );
    }
  };

  useEffect(() => {
    setPosition({ x: content.posX, y: content.posY });
    handleBoundX();
    handleBoundY();
  }, [content, childrenWidth, chidrenHeight]);

  const handleOnStop = async (e, data) => {
    setPosition({ x: data.x, y: data.y });
    const component = { ...content, posX: data.x, posY: data.y };
    dispatch(updateComponent(component));

    if (component.type === "ROOM") {
      const response = await updateRoomPosition(component);
    } else {
      const response = await updateComponentPosition(component);
    }

    send(roomId, component);
  };

  return (
    <Draggable
      position={{ x: position.x, y: position.y }}
      bounds={"parent"}
      onStop={handleOnStop}
      disabled={disable || !user.fullPermission}
      cancel="input"
    >
      <div>
        {content.type === "NOTE" && (
          <Note
            setChildrenWidth={setChildrenWidth}
            setChildrenHeight={setChidrenHeight}
            setDisable={setDisable}
            content={content}
          />
        )}
        {content.type === "LINK" && (
          <Link
            setChildrenWidth={setChildrenWidth}
            setChildrenHeight={setChidrenHeight}
            setDisable={setDisable}
            content={content}
          />
        )}
        {content.type === "TODO" && (
          <Todo
            setChildrenWidth={setChildrenWidth}
            setChildrenHeight={setChidrenHeight}
            setDisable={setDisable}
            content={content}
          />
        )}
        {content.type === "COMMENT" && (
          <Comment
            setChildrenWidth={setChildrenWidth}
            setChildrenHeight={setChidrenHeight}
            setDisable={setDisable}
            content={content}
          />
        )}
        {content.type === "UPLOAD" && (
          <Upload
            setChildrenWidth={setChildrenWidth}
            setChildrenHeight={setChidrenHeight}
            setDisable={setDisable}
            content={content}
          />
        )}
        {content.type === "ROOM" && (
          <Room
            setChildrenWidth={setChildrenWidth}
            setChildrenHeight={setChidrenHeight}
            setDisable={setDisable}
            content={content}
          />
        )}
      </div>
    </Draggable>
  );
}

export default DraggableComponent;
