import "./css/Modal.css";
import { useDispatch, useSelector } from "react-redux";
import { selectModal, updateModal } from "./../../../store/modal-slice";

function Modal(props) {
  const modal = useSelector(selectModal);
  const dispatch = useDispatch();

  const handleTurnOff = () => {
    dispatch(updateModal({ ...modal, hide: true }));
  };

  return (
    <>
      <div className={`Modal ${modal.hide && `hide`}`}>
        <div className="Modal-backdrop" onClick={handleTurnOff}></div>
        <div className="Modal-content">
          <div className="Modal-icon">{modal.icon}</div>
          <div className="Modal-title">
            <h3>{modal.title}</h3>
          </div>
          <div className="Modal-text">{modal.text}</div>
          <div className="Modal-contain-button">
            <button className="Modal-button" onClick={handleTurnOff}>
              {modal.buttonConfirmText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
