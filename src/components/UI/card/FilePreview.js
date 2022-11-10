import { API_URL } from "../../../api/common-api";
import pdf from "../../../assets/image/pdf.png";
import doc from "../../../assets/image/doc.png";
import xls from "../../../assets/image/xls.png";
import xlsx from "../../../assets/image/xlsx.png";
import xml from "../../../assets/image/xml.png";
import txt from "../../../assets/image/txt.png";
import js from "../../../assets/image/js.png";
import json from "../../../assets/image/json.png";
import file from "../../../assets/image/file.png";
import csv from "../../../assets/image/csv.png";
import html from "../../../assets/image/html.png";
import css from "../../../assets/image/css.png";

import "./css/FilePreview.css";
import { useState } from "react";
import { updateTitleAttribute } from "../../../api/attribute-api";
import { send } from "../../../utils/sockjs/client-sockjs";
import { useParams } from "react-router-dom";

function FilePreview(props) {
  const { type, link, title, content } = props;
  const [value, setValue] = useState(title);
  const { roomId } = useParams();

  const renderIcon = () => {
    if (type.startsWith("application/pdf")) {
      return pdf;
    } else if (
      type.startsWith("application/msword") ||
      type.startsWith(
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      )
    ) {
      return doc;
    } else if (type.startsWith("application/vnd.ms-excel")) {
      return xls;
    } else if (
      type.startsWith(
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
    ) {
      return xlsx;
    } else if (type.startsWith("application/xml")) {
      return xml;
    } else if (type.startsWith("text/plain")) {
      return txt;
    } else if (type.startsWith("text/html")) {
      return html;
    } else if (type.startsWith("text/css")) {
      return css;
    } else if (type.startsWith("text/csv")) {
      return csv;
    } else if (type.startsWith("text/javascript")) {
      return js;
    } else if (type.startsWith("application/json")) {
      return json;
    }
  };

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

      {!type.startsWith("image/") && (
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
            <img src={renderIcon()} alt="" style={{ width: "30px" }} />
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
