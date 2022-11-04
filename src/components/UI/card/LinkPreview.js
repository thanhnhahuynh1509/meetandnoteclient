import "./css/LinkPreview.css";
import axios from "axios";
import { useEffect } from "react";

function LinkPreview(props) {
  const { link } = props;
  const openLocation = (url) => {
    window.open(url, "_blank");
  };

  return (
    <>
      {link && (
        <div className="LinkPreview">
          {!link.videoURL && (
            <img
              className="LinkPreview-main-image"
              src={link.image}
              alt={link.altImage}
            />
          )}
          {link.videoURL && (
            <iframe
              style={{ width: "100%", border: "none", outline: "none", borderRadius: "4px" }}
              src={link.videoURL}
            ></iframe>
          )}
          <div
            className="LinkPreview-link-container"
            onClick={() => openLocation(link.url)}
          >
            <img
              className="link-container-icon"
              onError={() => console.log("error")}
              src={`https://www.google.com/s2/favicons?domain=${link.url}`}
              alt=""
            />
            <span className="link-container-content">{link.url} </span>
          </div>
          <div
            className="LinkPreview-title"
            onClick={() => openLocation(link.url)}
          >
            <p>{link.title}</p>
          </div>
          <div className="LinkPreview-desc">{link.description}</div>
        </div>
      )}
    </>
  );
}

export default LinkPreview;
