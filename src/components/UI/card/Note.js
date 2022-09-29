import "./css/card-text.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeComponent } from "../../../store/component-slice";

function Note(props) {
  const dispatch = useDispatch();
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState("");

  const handleFocus = () => {
    props.setDisable(true);
    setIsFocus(true);
  };

  const handleBlur = () => {
    props.setDisable(false);
    setIsFocus(false);
  };

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
      <div className={`contain-card ${isFocus && `card-text-focus`}`}>
        <div
          className={`card-text Note`}
          contentEditable={true}
          placeholder="Type something..."
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          value={value}
          onInput={handleOnChange}
        ></div>
      </div>
    </>
  );
}

export default Note;
