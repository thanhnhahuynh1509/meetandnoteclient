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
import LinkPreview from "./LinkPreview";

function Link(props) {
  const dispatch = useDispatch();
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState("");
  const [renderUrl, setRenderUrl] = useState(false);
  const [link, setLink] = useState(null);

  const handleFocus = async () => {
    props.setDisable(true);
    setIsFocus(true);
    dispatch(setCurrentComponent(props.content));
  };

  const handleBlur = () => {
    props.setDisable(false);
    setIsFocus(false);
  };

  const handleKeyDown = async (e) => {
    const key = e.key;
    if (key === "Backspace") {
      if (!value) {
        dispatch(removeComponent(props.content));
      }
    }

    if (key === "Enter") {
      if (value && isValidUrl(value)) {
        setRenderUrl(true);
        props.setDisable(false);
        setIsFocus(false);

        const link = await (
          await axios.get(API_URL + "/api/link?url=" + value, getConfig())
        ).data;
        console.log(link);
        setLink(link);
      }
    }
  };

  const handleOnChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div
        className={`contain-card Link ${isFocus && `card-text-focus`}`}
        onClick={(e) => e.stopPropagation()}
      >
        {!renderUrl && (
          <>
            <i className="fa-solid fa-link"></i>
            <input
              type="url"
              className={`card-text`}
              placeholder="Enter a link URL"
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              value={value}
              onChange={handleOnChange}
            />
          </>
        )}

        {renderUrl && <LinkPreview link={link} />}
      </div>
    </>
  );
}

export default Link;
