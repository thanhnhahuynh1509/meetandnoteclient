import ModalWorkspace from "./ModalWorkspace";
import "./css/ModalVideo.css";
import { useRef, useEffect } from "react";

function ModalVideo(props) {
  const localVideoRef = useRef();
  const constraints = {
    video: true,
    audio: true,
  };
  useEffect(() => {
    const conn = new WebSocket("ws://localhost:8080/ws");
    console.log(conn);
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      document.getElementById("local-video").srcObject = stream;
    });
  }, []);

  return (
    <>
      <ModalWorkspace
        {...props}
        className="ModalVideo"
        width="90vw"
        height="90vh"
      >
        <div className="ModalVideo-container">
          <div className="ModalVideo-contains">
            <div className="VideoCard">
              {/* <img
                src="https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/280109609_3121034704880165_6664039898340461523_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=gpKoiHkv4l0AX-leWM4&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfDET0wYavAz4xOOdcldZL_zZQp7HmG30pC5hlnxT-y5oA&oe=635F7D2E"
                alt=""
              /> */}
              <video
                ref={localVideoRef}
                id="local-video"
                height={200}
                autoPlay
              ></video>
              <div className="VideoCard-features">
                <button className="button-transparent"></button>
                <button className="button-transparent"></button>
                <button className="button-transparent"></button>
              </div>
            </div>
          </div>

          <div className="ModalVideo-features">
            <button
              className="button"
              onClick={() => (constraints.video = false)}
            >
              <i className="fa-solid fa-microphone-slash"></i>
            </button>
            <button className="button">
              <i className="fa-solid fa-phone-slash"></i>
            </button>
          </div>
        </div>
      </ModalWorkspace>
    </>
  );
}

export default ModalVideo;
