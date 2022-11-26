import ModalWorkspace from "./ModalWorkspace";
import "./css/ModalVideo.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { JitsiMeeting } from "@jitsi/react-sdk";

function ModalVideo(props) {
  const { roomId } = useParams();
  const [minimize, setMinimize] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <ModalWorkspace
        {...props}
        className={`ModalVideo ${minimize && "minimize"}`}
        width="90vw"
        height="90vh"
      >
        <div className="minimize-div">
          <button
            className="button-maximize"
            onClick={(e) => setMinimize(false)}
          >
            <i className="fa-solid fa-minimize"></i>
          </button>
        </div>
        <button className="button-minimize" onClick={(e) => setMinimize(true)}>
          <i className="fa-solid fa-minimize"></i>
        </button>
        <JitsiMeeting
          roomName={roomId}
          configOverwrite={{
            startWithAudioMuted: true,
            disableModeratorIndicator: true,
            startScreenSharing: true,
            enableEmailInStats: false,
          }}
          interfaceConfigOverwrite={{
            DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
          }}
          userInfo={{
            displayName: user.firstName + " " + user.lastName,
          }}
          onApiReady={(externalApi) => {
            // here you can attach custom event listeners to the Jitsi Meet External API
            // you can also store it locally to execute commands
          }}
          getIFrameRef={(iframeRef) => {
            iframeRef.style.height = "100%";
          }}
        />
      </ModalWorkspace>
    </>
  );
}

export default ModalVideo;
