import "./css/card-text.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeComponent,
  selectCurrentComponent,
  setCurrentComponent,
  updateComponent,
} from "../../../store/component-slice";
import { deleteComponent } from "../../../api/component-api";
import {
  getAttributeByComponentID,
  saveAttribbute,
} from "../../../api/attribute-api";
import { send } from "../../../utils/sockjs/client-sockjs";
import { useParams } from "react-router-dom";

function Note(props) {
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState("");
  const currentComponent = useSelector(selectCurrentComponent);
  const [attribute, setAttribute] = useState(props.content.attribute);

  useEffect(() => {
    const init = async () => {
      const attr = await getAttributeByComponentID(props.content.id);
      setAttribute(attr);
      setValue(attr.content);
    };
    init();
  }, []);

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
    dispatch(setCurrentComponent({ ...props.content, attribute }));
  };

  const handleBlur = () => {
    const attributeUpdate = {
      ...attribute,
      content: value,
      component: { id: props.content.id },
    };

    saveAttribbute(attributeUpdate);
    send(roomId, { ...props.content, attribute: attributeUpdate });
  };

  const handleKeyDown = (e) => {
    const key = e.key;
    if (key === "Backspace") {
      if (!value) {
        dispatch(removeComponent(props.content));
        deleteComponent(props.content);
      }
    }
  };

  const handleOnChange = (e) => {
    setValue(e.currentTarget.textContent);
  };

  return (
    <>
      <div
        style={{
          boxShadow:
            "0 2px 5px rgba(0, 0, 0, 0.1), inset 0 4px 0px " +
            props.content.attribute.color,
        }}
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
        >
          {props.content.attribute.content}
        </div>
      </div>
    </>
  );
}

export default Note;
