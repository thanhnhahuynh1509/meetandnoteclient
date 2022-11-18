import ModalWorkspace from "./ModalWorkspace";
import "./css/ModalVideo.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ModalVideo(props) {
  const socket = new WebSocket("ws://127.0.0.1:4000");

  const { roomId } = useParams();
  const [hasUser, setHasUser] = useState(false);

  const [usersStream, setUsersStream] = useState([]);

  let peerConn;
  let localStream;

  const sendData = (data) => {
    data.username = roomId;
    socket.send(JSON.stringify(data));
  };

  const createAndSendAnswer = () => {
    peerConn.createAnswer(
      (answer) => {
        peerConn.setLocalDescription(answer);
        sendData({
          type: "send_answer",
          answer: answer,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const createAndSendOffer = () => {
    console.log("create offer");

    peerConn.createOffer(
      (offer) => {
        sendData({
          type: "store_offer",
          offer: offer,
        });

        peerConn.setLocalDescription(offer);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleSignalingData = (data) => {
    switch (data.type) {
      case "answer":
        peerConn.setRemoteDescription(data.answer);
        break;
      case "offer":
        peerConn.setRemoteDescription(data.offer);
        createAndSendAnswer();
        break;
      case "candidate":
        peerConn.addIceCandidate(data.candidate);
        break;
      case "hasUser":
        console.log("hasUser");
        setHasUser(true);
        break;
    }
  };

  socket.onmessage = (e) => {
    handleSignalingData(JSON.parse(e.data));
  };

  socket.onopen = () => {
    sendData({ type: "store_user" });
  };

  const callVideo = () => {
    console.log(hasUser);
    navigator.getUserMedia(
      {
        video: {
          frameRate: 24,
          width: {
            min: 480,
            ideal: 720,
            max: 1280,
          },
          aspectRatio: 1.33333,
        },
        audio: true,
      },
      (stream) => {
        localStream = stream;
        document.getElementById("local-video").srcObject = localStream;

        console.log(document.getElementById("local-video").srcObject);
        if (!hasUser) {
          sendData({ type: "store_user" });
        }

        let configuration = {
          iceServers: [
            {
              urls: [
                "stun:stun.l.google.com:19302",
                "stun:stun1.l.google.com:19302",
                "stun:stun2.l.google.com:19302",
              ],
            },
          ],
        };

        peerConn = new RTCPeerConnection(configuration);
        peerConn.addStream(localStream);

        peerConn.onaddstream = (e) => {
          console.log(e);
          setUsersStream([...usersStream, e]);
          document.getElementById("remote-video").srcObject = e.stream;
          console.log(document.getElementById("remote-video").srcObject);
        };

        peerConn.onicecandidate = (e) => {
          if (e.candidate == null) return;

          if (!hasUser) {
            sendData({ type: "store_candidate", candidate: e.candidate });
          } else {
            sendData({ type: "send_candidate", candidate: e.candidate });
          }
        };

        if (hasUser) {
          sendData({ type: "join_call" });
        } else {
          createAndSendOffer();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    console.log("total user stream: " + usersStream.length);
  }, [usersStream]);

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
                id="local-video"
                style={{ maxWidth: "100%" }}
                autoPlay
              ></video>
              <div className="VideoCard-features">
                <button className="button-transparent"></button>
                <button className="button-transparent"></button>
                <button className="button-transparent"></button>
              </div>
            </div>

            <div className="VideoCard">
              {/* <img
                src="https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/280109609_3121034704880165_6664039898340461523_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=gpKoiHkv4l0AX-leWM4&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfDET0wYavAz4xOOdcldZL_zZQp7HmG30pC5hlnxT-y5oA&oe=635F7D2E"
                alt=""
              /> */}
              <video id="remote-video" height={200} autoPlay></video>
              <div className="VideoCard-features">
                <button className="button-transparent"></button>
                <button className="button-transparent"></button>
                <button className="button-transparent"></button>
              </div>
            </div>
          </div>

          <div className="ModalVideo-features">
            <button className="button">
              <i className="fa-solid fa-microphone-slash"></i>
            </button>
            <button className="button">
              <i className="fa-solid fa-phone-slash"></i>
            </button>
            <button onClick={callVideo}>Call</button>
          </div>
        </div>
      </ModalWorkspace>
    </>
  );
}

export default ModalVideo;
