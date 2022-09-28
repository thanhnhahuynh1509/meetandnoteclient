import Draggable from "react-draggable";
import Note from "./Note";
import { useDispatch } from "react-redux";
import { addSpace } from "../../../store/screen-additional-space";
import { useState } from "react";
import { updateComponent } from "../../../store/component-slice";

function DraggableComponent(props) {
  const dispatch = useDispatch();
  const { parentRef, content } = props;

  const [position, setPosition] = useState({ ...props.position });

  const parentPos = parentRef.current.getBoundingClientRect();

  const parentBoundX = parentPos.width;
  const parentBoundY = parentPos.height;

  const handleBoundX = () => {
    if (position.x + 100 >= Math.round(parentBoundX)) {
      dispatch(addSpace({ width: 100, height: 0 }));
    }
  };

  const handleBoundY = () => {
    if (position.y + 100 >= Math.round(parentBoundY)) {
      dispatch(addSpace({ width: 0, height: 100 }));
    }
  };

  const handleOnStop = (e, data) => {
    setPosition({ x: data.x, y: data.y });
    const component = { ...content, posX: data.x, posY: data.y };
    dispatch(updateComponent(component));
  };

  handleBoundX();
  handleBoundY();

  return (
    <Draggable
      position={{ x: position.x, y: position.y }}
      bounds={"parent"}
      onStop={handleOnStop}
    >
      <div>
        <Note />
      </div>
    </Draggable>
  );
}

export default DraggableComponent;
