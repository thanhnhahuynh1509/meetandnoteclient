import "./css/card-text.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeComponent,
  selectCurrentComponent,
  setCurrentComponent,
} from "../../../store/component-slice";
import { trashComponent } from '../../../api/component-api';
import { saveAttribbute } from '../../../api/attribute-api';

function Note(props) {
  const dispatch = useDispatch();
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(props.content.attribute.content);
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

  const handleBlur = () => {
    const attribute = {
      ...props.content.attribute,
      content: value,
      component: {id: props.content.id}
    }

    saveAttribbute(attribute);
  };

  const handleKeyDown = (e) => {
    const key = e.key;
    if (key === "Backspace") {
      if (!value) {
        dispatch(removeComponent(props.content));
        trashComponent(props.content);
      }
    }
  };

  const handleOnChange = (e) => {
    setValue(e.currentTarget.textContent);
  };

  return (
    <>
      <div
        style={{boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1), inset 0 4px 0px " + props.content.attribute.color}}
        className={`contain-card ${isFocus && `card-text-focus`}`}
        onClick={(e) => e.stopPropagation()}
        id={props.content.id + props.content.type}
      >
        <div
          className={`card-text Note`}
          contentEditable={true}
          suppressContentEditableWarning={true}
          placeholder="Type something..."
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          onInput={handleOnChange}
          onBlur={handleBlur}
        >{props.content.attribute.content}</div>
      </div>
    </>
  );
}

export default Note;
