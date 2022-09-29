import DraggableComponent from "./../UI/card/DraggableComponent";
import "./css/WorkspaceContent.css";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { selectComponents } from "../../store/component-slice";
import { selectAdditionalSpace } from "../../store/screen-additional-space";
import { selectStartContent } from "./../../store/screen-additional-space";

function WorkspaceContent(props) {
  const contentRef = useRef();
  const content = useSelector(selectComponents);

  const additionalSpace = useSelector(selectAdditionalSpace);
  const startContentPos = useSelector(selectStartContent);

  document.addEventListener("contextmenu", (event) => {});

  const handleContextMenu = (event) => {
    event.preventDefault();
    // const xPos = event.pageX + "px";
    // const yPos = event.pageY + "px";
  };

  return (
    <>
      <div
        className="Workspace-content"
        style={{
          width: "calc(100% + " + additionalSpace.width + "px)",
          height: "calc(100% + " + additionalSpace.height + "px)",
        }}
        onContextMenu={handleContextMenu}
        ref={contentRef}
      >
        {content.map((c) => (
          <DraggableComponent
            position={{ x: c.posX - startContentPos, y: c.posY }}
            parentRef={contentRef}
            content={c}
            key={c.id}
          ></DraggableComponent>
        ))}
      </div>
    </>
  );
}

export default WorkspaceContent;
