import React from "react";
import Popup from "reactjs-popup";
import "./Modal.css";

function Modal() {
  return (
    <Popup
      trigger={
        <button type="button" className="buttonpop">
          {" "}
          ?{" "}
        </button>
      }
      modal
    >
      {(close) => (
        <div className="modal">
          <button type="button" className="close" onClick={close}>
            &times;
          </button>
          <div className="content">
            <p className="pa">
              Choisissez le film selon vos préférences parmi des milliers
              d'autres.
              <br />
              Répondez à ces trois questions et profitez du visionnage!
            </p>
          </div>
        </div>
      )}
    </Popup>
  );
}

export default Modal;
