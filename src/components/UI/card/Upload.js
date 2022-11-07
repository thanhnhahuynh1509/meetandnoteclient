import "./css/card-text.css";
import "./css/card-link.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeComponent,
  selectCurrentComponent,
  setCurrentComponent,
} from "../../../store/component-slice";
import { isValidUrl } from "./../../../utils/validate";
import axios from "axios";
import { API_URL, getConfig } from "../../../api/common-api";
import { uploadAttributeFile } from "../../../api/attribute-api";
import LinkPreview from "./LinkPreview";
import { saveAttribbute } from "../../../api/attribute-api";
import { useEffect } from "react";
import { deleteComponent } from "../../../api/component-api";
import { send } from "../../../utils/sockjs/client-sockjs";
import { useParams } from "react-router-dom";
import FilePreview from "./FilePreview";

function Upload(props) {
  const dispatch = useDispatch();
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState("");
  const [renderUrl, setRenderUrl] = useState(false);
  const [link, setLink] = useState(null);
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const { roomId } = useParams();
  const currentComponent = useSelector(selectCurrentComponent);

  const init = async () => {
    if (props.content.attribute.content) {
      setRenderUrl(true);
      setLink(props.content.attribute.content);
      setType(props.content.attribute.fileType);
      setTitle(props.content.attribute.title);
    }
  };

  useEffect(() => {
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

  useEffect(() => {
    init();
  }, [props.content.attribute]);

  //   const handleFocus = async () => {
  //     props.setDisable(true);
  //     setIsFocus(true);
  //     dispatch(setCurrentComponent(props.content));
  //   };

  //   const saveAndRender = async () => {
  //     const attribute = {
  //       ...props.content.attribute,
  //       content: value,
  //       component: { id: props.content.id },
  //     };

  //     saveAttribbute(attribute);

  //     setRenderUrl(true);
  //     props.setDisable(false);
  //     setIsFocus(false);
  //     send(roomId, { ...props.content, attribute });

  //     const link = await (
  //       await axios.get(API_URL + "/api/link?url=" + value, getConfig())
  //     ).data;
  //     setLink(link);
  //   };

  //   const handleBlur = () => {
  //     props.setDisable(false);
  //     setIsFocus(false);
  //     if (value && isValidUrl(value)) {
  //       saveAndRender();
  //     }
  //   };

  //   const handleKeyDown = async (e) => {
  //     const key = e.key;
  //     if (key === "Backspace") {
  //       if (!value) {
  //         dispatch(removeComponent(props.content));
  //         deleteComponent(props.content);
  //         send(roomId, { ...props.content, command: "DELETE" });
  //       }
  //     }

  //     if (key === "Enter") {
  //       if (value && isValidUrl(value)) {
  //         saveAndRender();
  //       }
  //     }
  //   };

  const handleOnChange = async (e) => {
    setValue(e.target.value);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const path = await uploadAttributeFile(props.content.id, formData);
    setLink(path);
    console.log(file);
    setRenderUrl(true);
    setType(file.type);
    setTitle(file.name);
    send(roomId, {
      ...props.content,
      attribute: {
        ...props.content.attribute,
        title: file.name,
        fileType: file.type,
        content: path,
      },
    });
  };

  const handleOnClick = (e) => {
    e.stopPropagation();
    dispatch(setCurrentComponent(props.content));
    setIsFocus(true);
    props.setDisable(true);
  };

  return (
    <>
      {!renderUrl && (
        <div
          className={`contain-card Link ${isFocus && `card-text-focus`}`}
          onClick={handleOnClick}
        >
          <>
            <i className="fa-solid fa-link"></i>
            <input
              type="file"
              className={`card-text`}
              placeholder="Enter a link URL"
              value={value}
              onChange={handleOnChange}
            />
          </>
        </div>
      )}
      {renderUrl && (
        <>
          <FilePreview
            handleOnClick={handleOnClick}
            isFocus={isFocus}
            title={title}
            type={type}
            link={link}
            content={props.content}
          />
        </>
      )}
    </>
  );
}

export default Upload;
