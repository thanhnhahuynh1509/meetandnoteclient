import { useDispatch, useSelector } from "react-redux";
import { deleteRoom } from "../../api/room-api";
import {
  removeComponent,
  selectCurrentComponent,
  setCurrentComponent,
} from "../../store/component-slice";
import "./css/ToolbarAdditionalFeature.css";
import ToolItemCard from "./ToolItemCard";
import { deleteComponent } from "../../api/component-api";
import { send } from "../../utils/sockjs/client-sockjs";
import { useParams } from "react-router-dom";

function ToolbarAdditionalTrash(props) {
  const dispatch = useDispatch();
  const currentComponent = useSelector(selectCurrentComponent);
  const { roomId } = useParams();

  const handleOnClick = (e) => {
    e.stopPropagation();

    if (currentComponent) {
      if (currentComponent.type === "ROOM") {
        deleteRoom(currentComponent);
      } else {
        deleteComponent(currentComponent);
      }
      dispatch(removeComponent(currentComponent));
      dispatch(setCurrentComponent(null));
      send(roomId, { ...currentComponent, command: "DELETE" });
    }
  };

  return (
    <>
      <li className="ToolbarAdditionalFeature" onClick={handleOnClick}>
        <ToolItemCard icon={props.icon} title={props.title} />
      </li>
    </>
  );
}

export default ToolbarAdditionalTrash;
