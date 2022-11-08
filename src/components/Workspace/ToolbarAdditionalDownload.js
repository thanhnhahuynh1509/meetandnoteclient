import ToolItemCard from "./ToolItemCard";
import "./css/ToolbarAdditionalFeature.css";
import { useSelector } from "react-redux";
import { selectCurrentComponent } from "../../store/component-slice";
import { API_URL } from "../../api/common-api";
import { useRef } from "react";

function ToolbarAdditionalDownload(props) {
  const currentComponent = useSelector(selectCurrentComponent);
  const downloadLinkRef = useRef(null);
  console.log(currentComponent);
  const handleOnClick = (e) => {
    e.stopPropagation();
    downloadLinkRef.current.click();
  };

  return (
    <>
      <li className="ToolbarAdditionalFeature" onClick={handleOnClick}>
        <ToolItemCard icon={props.icon} title={props.title} />
        <a
          ref={downloadLinkRef}
          href={API_URL + "/" + currentComponent.attribute.content}
          style={{ display: "none" }}
          download={"abc"}
        ></a>
      </li>
    </>
  );
}

export default ToolbarAdditionalDownload;
