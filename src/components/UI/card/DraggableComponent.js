import Draggable from "react-draggable";
import Note from "./Note";
import { useDispatch } from "react-redux";
import { addSpace } from "../../../store/screen-additional-space";
import { useState } from "react";
import { updateComponent } from "../../../store/component-slice";
import Link from "./Link";

const spaceAddition = 200;

function DraggableComponent(props) {
  const dispatch = useDispatch();
  const { parentRef, content } = props;

  const [disable, setDisable] = useState(false);
  const [position, setPosition] = useState({ ...props.position });

  const parentPos = parentRef.current.getBoundingClientRect();

  const parentBoundX = parentPos.width;
  const parentBoundY = parentPos.height;

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
  };

  handleBoundX();
  handleBoundY();

  console.log(content);

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
      </div>
    </Draggable>
  );
}

export default DraggableComponent;
