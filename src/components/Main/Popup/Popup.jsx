import React from "react";
import "../../../blocks/popup.css";

export default function Popup({ onClose, title, children, isImage }) {
  return (
    <div className="popup popup_opened">
      <div
        className={
          isImage
            ? "popup__content_content_image"
            : "popup__container"
        }
      >
        {/* Botón de cerrar */}
        <button
          className="popup__close-button"
          aria-label="Cerrar"
          onClick={onClose}
        >
          ×
        </button>

        {/* Popup normal */}
        {!isImage && (
          <>
            {title && <h2 className="popup__title">{title}</h2>}
            {children}
          </>
        )}

        {/* Popup de imagen */}
        {isImage && children}
      </div>
    </div>
  );
}
