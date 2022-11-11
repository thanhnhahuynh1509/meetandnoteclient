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
import { useRef } from "react";

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
  const currentRef = useRef();

  const init = async () => {
    if (props.content.attribute.content) {
      setRenderUrl(true);
      setLink(props.content.attribute.content);
      setType(props.content.attribute.fileType);
      setTitle(props.content.attribute.title);
    }
  };

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
    const children = currentRef.current.getBoundingClientRect();
    props.setChildrenWidth(children.width);
    props.setChildrenHeight(children.height);
  }, [props.content.attribute]);

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
          ref={currentRef}
        >
          <>
            <i className="fa-solid fa-link"></i>
            <input
              type="file"
              className={`card-text`}
              accept={
                "image/*, .pdf, .doc, .docx, .xls, .xlsx, .xml, .txt, .html, .js, .json, .css"
              }
              placeholder="Enter a link URL"
              value={value}
              onChange={handleOnChange}
            />
          </>
        </div>
      )}
      {renderUrl && (
        <div ref={currentRef}>
          <FilePreview
            handleOnClick={handleOnClick}
            isFocus={isFocus}
            title={title}
            type={type}
            link={link}
            content={props.content}
          />
        </div>
      )}
    </>
  );
}

export default Upload;
