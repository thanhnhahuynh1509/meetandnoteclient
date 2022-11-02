import "./css/card-text.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeComponent,
  selectCurrentComponent,
  setCurrentComponent,
} from "../../../store/component-slice";

function Note(props) {
  const dispatch = useDispatch();
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState("");
  const currentComponent = useSelector(selectCurrentComponent);

  useEffect(() => {
    if (
      !currentComponent ||
      currentComponent.id + currentComponent.type !==
        props.content.id + props.content.type
    ) {
      props.setDisable(false);
      setIsFocus(false);
    }
  }, [currentComponent]);

  const handleFocus = (e) => {
    props.setDisable(true);
    setIsFocus(true);
    dispatch(setCurrentComponent(props.content));
  };

  // const handleBlur = () => {
  //   if (!currentComponent) {
  //     props.setDisable(false);
  //     setIsFocus(false);
  //   }
  // };

  const handleKeyDown = (e) => {
    const key = e.key;
    if (key === "Backspace") {
      if (!value) {
        dispatch(removeComponent(props.content));
      }
    }
  };

  const handleOnChange = (e) => {
    setValue(e.currentTarget.textContent);
  };

  return (
    <>
      <div
        className={`contain-card ${isFocus && `card-text-focus`}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`card-text Note`}
          contentEditable={true}
          placeholder="Type something..."
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          onInput={handleOnChange}
        ></div>
      </div>
    </>
  );
}

export default Note;
