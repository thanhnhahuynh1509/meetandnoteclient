import { API_URL } from "../../../api/common-api";
import pdf from "../../../assets/image/pdf.png";
import "./css/FilePreview.css";
import { useState } from "react";
import { updateAttribute } from "../../../api/attribute-api";
import { send } from "../../../utils/sockjs/client-sockjs";
import { useParams } from "react-router-dom";

function FilePreview(props) {
  const { type, link, title, content } = props;
  const [value, setValue] = useState("");
  const { roomId } = useParams();

  console.log(content);

  const handleBlur = async () => {
    try {
      const response = await updateAttribute({
        ...content,
        title: value,
      });
      // console.log(response);
      send(roomId, { ...content, title: value });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {type.startsWith("image/") && (
        <object data={API_URL + "/" + link} width="300"></object>
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
          >
            {title}
          </div>
        </div>
      )}
    </>
  );
}

export default FilePreview;
