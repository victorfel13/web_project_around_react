import React from "react";

export default function Popup({ title, children, onClose }) {
  return (
    <div className="popup popup_opened">
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
        >
          &times;
        </button>
        {title && <h2 className="popup__title">{title}</h2>}
        {children}
      </div>
    </div>
  );
}
