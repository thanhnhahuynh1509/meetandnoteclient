import "./css/Workspace.css";
import WorkspaceToolbar from "./WorkspaceToolbar";
import WorkspaceContent from "./WorkspaceContent";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "../../utils/sockjs/client-sockjs";
import { useDispatch, useSelector } from "react-redux";
import {
  addComponent,
  removeComponent,
  selectComponents,
  updateComponent,
} from "../../store/component-slice";
import Header from "../UI/header/Header";
import { checkUserInRoom, getRoomByLink } from "../../api/room-api";
import { updateCurrentRoom } from "../../store/room-slice";
import { updateChat } from "../../store/chat-slice";

function Workspace(props) {
  const { roomId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const components = useSelector(selectComponents);
  const dispatch = useDispatch();

  const addComponentSockJS = (component) => {
    const command = component.command;
    delete component.command;
    if (!command || command === "ADD") {
      console.log("call update with component: " + component.id);
      dispatch(updateComponent(component));
    } else if (command === "DELETE") {
      dispatch(removeComponent(component));
    } else if (command === "CHAT") {
      dispatch(updateChat(component));
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const userInRoom = await checkUserInRoom(roomId, user.id);
        if (!userInRoom) {
          // not in the room
          window.location.href = "/" + user.roomLink;
        }
        const room = await getRoomByLink(roomId);
        connect(roomId, addComponentSockJS);
        dispatch(updateCurrentRoom(room));
      } catch (e) {
        window.location.href = "/";
      }
    };
    init();
  }, []);

  return (
    <>
      <Header />
      <div className="Workspace">
        <WorkspaceToolbar />
        <WorkspaceContent />
      </div>
    </>
  );
}

export default Workspace;
