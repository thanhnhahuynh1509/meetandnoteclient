import "./css/Workspace.css";
import WorkspaceToolbar from "./WorkspaceToolbar";
import WorkspaceContent from "./WorkspaceContent";
import { useParams } from "react-router-dom";

function Workspace(props) {
  const { roomId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="Workspace">
        <WorkspaceToolbar />
        <WorkspaceContent />
      </div>
    </>
  );
}

export default Workspace;
