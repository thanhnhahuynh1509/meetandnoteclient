import "./css/card-text.css";
import "./css/card-link.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeComponent } from "../../../store/component-slice";
import { isValidUrl } from "./../../../utils/validate";

function Link(props) {
  const dispatch = useDispatch();
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState("");
  const [renderUrl, setRenderUrl] = useState(false);

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

    if (key === "Enter") {
      if (value && isValidUrl(value)) {
        setRenderUrl(true);
        props.setDisable(false);
        setIsFocus(false);
      }
    }
  };

  const handleOnChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div className={`contain-card Link ${isFocus && `card-text-focus`}`}>
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

        {renderUrl && (
          <>
            <iframe
              width="300"
              height="200"
              src={`//${value
                .replace("http://", "")
                .replace("https://", "")
                .replace("watch?v=", "embed/")}`}
            ></iframe>
          </>
        )}
      </div>
    </>
  );
}

export default Link;
