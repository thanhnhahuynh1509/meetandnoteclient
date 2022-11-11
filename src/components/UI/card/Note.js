import "./css/card-text.css";
import hljs from "highlight.js";

import "react-quill/dist/quill.snow.css";

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
import ReactQuill from "react-quill";

function Note(props) {
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(props.content.attribute);
  const currentComponent = useSelector(selectCurrentComponent);
  const [attribute, setAttribute] = useState(props.content.attribute);
  const user = JSON.parse(localStorage.getItem("user"));

  const currentRef = useRef();

  useEffect(() => {
    const init = async () => {
      const attr = await getAttributeByComponentID(props.content.id);
      setAttribute(attr);
      setValue(props.content.attribute.content);
    };
    init();
    const children = currentRef.current.getBoundingClientRect();
    props.setChildrenWidth(children.width);
    props.setChildrenHeight(children.height);
  }, []);

  useEffect(() => {
    setValue(props.content.attribute.content);
    const children = currentRef.current.getBoundingClientRect();
    props.setChildrenWidth(children.width);
    props.setChildrenHeight(children.height);
  }, [props.content]);

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
    console.log("focus");
    props.setDisable(true);
    setIsFocus(true);
    dispatch(setCurrentComponent({ ...props.content, attribute }));
  };

  const handleBlur = () => {
    console.log("blur");
    if (user.fullPermission) {
      const attributeUpdate = {
        ...attribute,
        content: value,
        component: { id: props.content.id },
      };

      saveAttribbute(attributeUpdate);
      send(roomId, { ...props.content, attribute: attributeUpdate });
    }
  };

  const handleKeyDown = (e) => {
    if (user.fullPermission) {
      const key = e.key;
      if (key === "Backspace") {
        if (!value) {
          dispatch(removeComponent(props.content));
          deleteComponent(props.content);
          dispatch(setCurrentComponent(null));
          send(roomId, { ...props.content, command: "DELETE" });
        }
      }
    }
  };

  const handleOnChange = (content) => {
    if (user.fullPermission) {
      setValue(content);
    }
  };

  hljs.configure({
    // optionally configure hljs
    languages: ["javascript", "ruby", "python"],
  });

  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ align: [] }],
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "color",
    "background",
    "align",
    "script",
    "code-block",
  ];

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
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        ref={currentRef}
      >
        <ReactQuill
          onChange={handleOnChange}
          theme="snow"
          modules={modules}
          formats={formats}
          readOnly={!user.fullPermission}
          value={value}
          placeholder={"Type something..."}
        />
      </div>
    </>
  );
}

export default Note;
