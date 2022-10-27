import Draggable from "react-draggable";
import Note from "./Note";
import { useDispatch } from "react-redux";
import { addSpace } from "../../../store/screen-additional-space";
import { useEffect, useState } from "react";
import { updateComponent } from "../../../store/component-slice";
import Link from "./Link";
import { send } from "../../../utils/sockjs/client-sockjs";

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

  useEffect(() => {
    setPosition({ x: content.posX, y: content.posY });
  }, [content]);

  const handleBoundX = () => {
    if (
      position.x + spaceAddition >=
      Math.round(parentBoundX - spaceAddition)
    ) {
      dispatch(addSpace({ width: spaceAddition, height: 0 }));
    }
  };

  const handleBoundY = () => {
    if (
      position.y + spaceAddition >=
      Math.round(parentBoundY - spaceAddition / 2)
    ) {
      dispatch(addSpace({ width: 0, height: spaceAddition }));
    }
  };

  const handleOnStop = (e, data) => {
    setPosition({ x: data.x, y: data.y });
    const component = { ...content, posX: data.x, posY: data.y };
    dispatch(updateComponent(component));

    send(user.roomLink, component);
  };

  handleBoundX();
  handleBoundY();

  // console.log(content);

  return (
    <Draggable
      position={{ x: position.x, y: position.y }}
      bounds={"parent"}
      onStop={handleOnStop}
      disabled={disable}
    >
      <div>
        {content.type === "NOTE" && (
          <Note setDisable={setDisable} content={content} />
        )}
        {content.type === "LINK" && (
          <Link setDisable={setDisable} content={content} />
        )}
        {content.type === "TODO" && <></>}
        {content.type === "COMMENT" && <></>}
        {content.type === "ROOM" && <></>}
      </div>
    </Draggable>
  );
}

export default DraggableComponent;
