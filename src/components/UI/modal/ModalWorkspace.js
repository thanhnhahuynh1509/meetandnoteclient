import "./css/ModalWorkspace.css";

function ModalWorkspace(props) {
  const { isOpen, onClose, width, height, className } = props;
  return (
    <>
      <div className={`${className} ModalWorkspace ${isOpen && `show`}`}>
        <div className="ModalWorkspace-backdrop" onClick={onClose}></div>
        <div
          className="ModalWorkspace-content"
          style={{ minWidth: width, height }}
        >
          {props.children}
        </div>
      </div>
    </>
  );
}

ModalWorkspace.defaultProps = {
  width: "365px",
  height: "auto",
};

export default ModalWorkspace;
