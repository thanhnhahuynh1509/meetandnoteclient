import "./css/WorkspaceToolbar.css";
import ToolbarItem from "./ToolbarItem";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAdditionalSpace,
  updateStartContent,
} from "../../store/screen-additional-space";
import { useEffect, useRef } from "react";

function WorkspaceToolbar(props) {
  const dispatch = useDispatch();
  const toolbarRef = useRef(null);
  const additionalSpace = useSelector(selectAdditionalSpace);

  useEffect(() => {
    const width = Math.round(toolbarRef.current.getBoundingClientRect().width);
    dispatch(updateStartContent(width));
  }, []);

  return (
    <>
      <div
        className="Workspace-toolbar"
        style={{ height: "calc(100% + " + additionalSpace.height + "px)" }}
        ref={toolbarRef}
      >
        <ul className="toolbar-items">
          <ToolbarItem
            title={"Note"}
            type={"NOTE"}
            icon={"fa-solid fa-bars"}
            refParent={toolbarRef}
          />
          <ToolbarItem title={"Link"} type={"LINK"} icon={"fa-solid fa-link"} />
          <ToolbarItem
            title={"To-do"}
            type={"TODO"}
            icon={"fa-solid fa-clipboard-list"}
          />
          <ToolbarItem
            title={"Comment"}
            type={"COMMENT"}
            icon={"fa-solid fa-message"}
          />
          <ToolbarItem
            title={"Room"}
            type={"ROOM"}
            icon={"fa-solid fa-door-closed"}
          />
        </ul>
      </div>
    </>
  );
}

export default WorkspaceToolbar;
