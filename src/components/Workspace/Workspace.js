import "./css/Workspace.css";
import WorkspaceToolbar from "./WorkspaceToolbar";
import WorkspaceContent from "./WorkspaceContent";

function Workspace(props) {
  //   const { id } = useParams();

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
