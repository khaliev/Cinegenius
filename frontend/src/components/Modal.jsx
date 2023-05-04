import React from "react";
import Popup from "reactjs-popup";
import "./Modal.css";

function Modal() {
  return (
    <Popup
      trigger={
        <button type="button" className="button">
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
            <p>
              Chosissez le film selon vos préférences parmi des milliers
              d'autres.
              <br />
              Répondez à ces trois questions et profitez du visionnage!
            </p>
          </div>
          <div className="actions">
            <button
              type="button"
              className="button"
              onClick={() => {
                close();
              }}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
}

export default Modal;
