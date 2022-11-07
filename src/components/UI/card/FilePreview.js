import { API_URL } from "../../../api/common-api";
import pdf from "../../../assets/image/pdf.png";
import "./css/FilePreview.css";
import { useState } from "react";
import { updateTitleAttribute } from "../../../api/attribute-api";
import { send } from "../../../utils/sockjs/client-sockjs";
import { useParams } from "react-router-dom";

function FilePreview(props) {
  const { type, link, title, content } = props;
  const [value, setValue] = useState(title);
  const { roomId } = useParams();

  const handleBlur = async () => {
    try {
      const response = await updateTitleAttribute({
        ...content.attribute,
        title: value,
      });
      console.log(response);
      send(roomId, { ...content, attribute: response });
    } catch (e) {
      console.log(e);
    }
  };

  const handleOnChange = (e) => {
    setValue(e.currentTarget.textContent);
  };

  return (
    <>
      {type.startsWith("image/") && (
        <div
          className={`contain-card Link ${props.isFocus && `card-text-focus`}`}
          onClick={props.handleOnClick}
        >
          <object data={API_URL + "/" + link} width="300"></object>
        </div>
      )}
      {type.startsWith("application/pdf") && (
        <div
          className="FilePreview-container"
          onClick={(e) => {
            e.stopPropagation();
            // window.open(API_URL + "/" + link, "_blank");
          }}
        >
          <div
            className={`contain-card FilePreview ${
              props.isFocus && `card-text-focus`
            }`}
            onClick={(e) => {
              if (props.isFocus) {
                e.stopPropagation();
                window.open(API_URL + "/" + link, "_blank");
              } else props.handleOnClick(e);
            }}
            onDoubleClick={(e) => {}}
          >
            <img src={pdf} alt="" style={{ width: "30px" }} />
          </div>
          <div
            contentEditable={true}
            suppressContentEditableWarning={true}
            className={"FilePreview-title"}
            onInput={handleOnChange}
            onBlur={handleBlur}
          >
            {title}
          </div>
        </div>
      )}
    </>
  );
}

export default FilePreview;
