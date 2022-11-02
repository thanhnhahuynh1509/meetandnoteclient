import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./css/Room.css";
import { useNavigate } from "react-router-dom";
import { updateRoomInformation } from "../../../api/room-api";
import {
  selectCurrentComponent,
  setCurrentComponent,
} from "../../../store/component-slice";

function Room(props) {
  const { content } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(content.title);
  const currentComponent = useSelector(selectCurrentComponent);

  const handleFocus = () => {
    props.setDisable(true);
    setIsFocus(true);
    dispatch(setCurrentComponent(content));
  };

  useEffect(() => {
    if (
      !currentComponent ||
      currentComponent.id + currentComponent.type !==
        props.content.id + props.content.type
    ) {
      setIsFocus(false);
      props.setDisable(false);
    }
  }, [currentComponent]);

  const handleBlur = async () => {
    props.setDisable(false);
    setIsFocus(false);
    try {
      const response = await updateRoomInformation({
        ...content,
        title: value,
      });
    } catch (e) {
      console.log(e);
    }
    dispatch(setCurrentComponent(null));
  };

  const handleOnChange = (e) => {
    setValue(e.currentTarget.textContent);
  };

  const handleNavigateRoom = (e) => {
    window.location.href = "/" + content.link;
  };

  const handleOnKeyDown = (e) => {
    const key = e.key;
    if (key === "Enter") {
      return;
    }
  };

  const handleOnClick = (e) => {
    e.stopPropagation();
    props.setDisable(true);
    setIsFocus(true);
    dispatch(setCurrentComponent(content));
  };

  return (
    <>
      <div
        className={`Room ${isFocus && "card-text-focus"}`}
        onDoubleClick={() => handleNavigateRoom()}
        onClick={handleOnClick}
      >
        <i className="fa-solid fa-door-closed"></i>
        <div
          className="Room-title"
          contentEditable={true}
          suppressContentEditableWarning={true}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleOnKeyDown}
          onInput={handleOnChange}
          onClick={(e) => e.stopPropagation()}
        >
          {content.title}
        </div>
      </div>
    </>
  );
}

export default Room;
