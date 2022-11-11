import ToolItemCard from "./ToolItemCard";
import "./css/ToolbarAdditionalFeature.css";
import { useSelector } from "react-redux";
import { selectCurrentComponent } from "../../store/component-slice";
import { API_URL } from "../../api/common-api";
import { useRef } from "react";
import { downloadAttributeFile } from "../../api/attribute-api";
import axios from "axios";

function ToolbarAdditionalDownload(props) {
  const currentComponent = useSelector(selectCurrentComponent);
  const downloadLinkRef = useRef(null);
  console.log(currentComponent);

  const download = (path, filename) => {
    // Create a new link
    const anchor = document.createElement("a");
    anchor.href = path;
    anchor.download = filename;

    // Append to the DOM
    document.body.appendChild(anchor);

    // Trigger `click` event
    anchor.click();

    // Remove element from DOM
    document.body.removeChild(anchor);
  };

  const handleOnClick = async (e) => {
    e.stopPropagation();

    const response = await axios.get(
      API_URL + "/" + currentComponent.attribute.content
    );
    const data = await response.data;
    const blob = new Blob([data], {
      type: currentComponent.attribute.fileType,
    });
    const url = URL.createObjectURL(blob);
    download(url, currentComponent.attribute.title);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <li className="ToolbarAdditionalFeature" onClick={handleOnClick}>
        <ToolItemCard icon={props.icon} title={props.title} />
      </li>
    </>
  );
}

export default ToolbarAdditionalDownload;
