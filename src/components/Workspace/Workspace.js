import "./css/Workspace.css";
import WorkspaceToolbar from "./WorkspaceToolbar";
import WorkspaceContent from "./WorkspaceContent";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "../../utils/sockjs/client-sockjs";
import { useDispatch, useSelector } from "react-redux";
import {
  addComponent,
  initComopent,
  removeComponent,
  selectComponents,
  updateComponent,
} from "../../store/component-slice";
import Header from "../UI/header/Header";
import { checkUserInRoom, getRoomByLink } from "../../api/room-api";
import { updateCurrentRoom } from "../../store/room-slice";
import { updateChat } from "../../store/chat-slice";
import { getUserByRoomAndUserId } from "../../api/users-api";
import { selectUser, updateUser } from "../../store/user-slice";
import { selectTrigger, setTrigger } from "../../store/utils-slice";

function Workspace(props) {
  const { roomId } = useParams();
  let user = JSON.parse(localStorage.getItem("user"));
  const components = useSelector(selectComponents);
  const userTrigger = useSelector(selectUser);
  const dispatch = useDispatch();
  const trigger = useSelector(selectTrigger);

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
    } else if (command === "PERMISSION") {
      if (user.id === component.userId) {
        user = { ...user, fullPermission: !user.fullPermission };
        localStorage.setItem("user", JSON.stringify({ ...user }));
        dispatch(addComponent(null));
      }
    } else if (command === "TRIGGER") {
      dispatch(setTrigger({ ...trigger }));
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const userInRoom = await checkUserInRoom(roomId, user.id);
        if (!userInRoom) {
          // not in the room
          window.location.href = "/authorized";
        }
        const room = await getRoomByLink(roomId);
        connect(roomId, addComponentSockJS);
        dispatch(updateCurrentRoom(room));
        const userResponse = await getUserByRoomAndUserId(user.id, room.id);
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...user,
            fullPermission: userResponse.fullPermission,
          })
        );
      } catch (e) {
        window.location.href = "/room-not-exist";
        console.log(e);
      }
    };
    init();
  }, []);

  useEffect(() => {}, [userTrigger]);

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
