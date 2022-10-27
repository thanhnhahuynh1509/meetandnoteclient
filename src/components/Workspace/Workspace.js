import "./css/Workspace.css";
import WorkspaceToolbar from "./WorkspaceToolbar";
import WorkspaceContent from "./WorkspaceContent";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "../../utils/sockjs/client-sockjs";
import { useDispatch, useSelector } from "react-redux";
import {
  addComponent,
  selectComponents,
  updateComponent,
} from "../../store/component-slice";
import Header from "../UI/header/Header";

function Workspace(props) {
  const { roomId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const components = useSelector(selectComponents);
  const dispatch = useDispatch();

  const addComponentSockJS = (component) => {
    console.log("call update with component: " + component.id);
    dispatch(updateComponent(component));
  };

  useEffect(() => {
    connect(roomId, addComponentSockJS);
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
