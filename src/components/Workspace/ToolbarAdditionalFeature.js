import { useDispatch, useSelector } from "react-redux";
import { deleteRoom } from "../../api/room-api";
import {
  removeComponent,
  selectCurrentComponent,
  setCurrentComponent,
} from "../../store/component-slice";
import "./css/ToolbarAdditionalFeature.css";
import ToolItemCard from "./ToolItemCard";
import { trashComponent } from "../../api/component-api";

function ToolbarAdditionalFeature(props) {
  const dispatch = useDispatch();
  const currentComponent = useSelector(selectCurrentComponent);

  const handleOnClick = (e) => {
    e.stopPropagation();

    if (props.type === "TRASH") {
      if (currentComponent) {
        if (currentComponent.type === "ROOM") {
          deleteRoom(currentComponent);
        } else {
          trashComponent(currentComponent);
        }
        dispatch(removeComponent(currentComponent));
        dispatch(setCurrentComponent(null));
      }
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

export default ToolbarAdditionalFeature;
