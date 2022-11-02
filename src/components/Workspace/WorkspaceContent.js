import DraggableComponent from "./../UI/card/DraggableComponent";
import "./css/WorkspaceContent.css";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  initComopent,
  selectComponents,
  setCurrentComponent,
} from "../../store/component-slice";
import { selectAdditionalSpace } from "../../store/screen-additional-space";
import { selectStartContent } from "./../../store/screen-additional-space";
import { getChildrenRoomByLink } from "../../api/room-api";
import { useParams } from "react-router-dom";
import { getComponentByLinkNotTrash } from "../../api/component-api";

function WorkspaceContent(props) {
  const contentRef = useRef();
  const components = useSelector(selectComponents);
  const dispatch = useDispatch();
  const { roomId } = useParams();

  const additionalSpace = useSelector(selectAdditionalSpace);
  const startContentPos = useSelector(selectStartContent);

  useEffect(() => {
    const init = async () => {
      const responseOfRooms = await getChildrenRoomByLink(roomId);
      const responseOfComponents = await getComponentByLinkNotTrash(roomId);
      dispatch(initComopent([...responseOfComponents, ...responseOfRooms]));
    };

    init();
  }, []);

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
          width:
            "calc(100% - var(--margin-left) + " + additionalSpace.width + "px)",
          height: "calc(100% + " + additionalSpace.height + "px)",
        }}
        onContextMenu={handleContextMenu}
        onClick={() => dispatch(setCurrentComponent(null))}
        ref={contentRef}
      >
        {components.map((c, index) => {
          return (
            <DraggableComponent
              position={{ x: c.posX - startContentPos, y: c.posY }}
              parentRef={contentRef}
              content={c}
              key={index}
            />
          );
        })}
      </div>
    </>
  );
}

export default WorkspaceContent;
