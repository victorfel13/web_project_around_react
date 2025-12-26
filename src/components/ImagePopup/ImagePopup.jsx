import React from "react";
import Popup from "../Popup/Popup";

export default function ImagePopup({ card, onClose }) {
  if (!card) return null;

  return (
    <Popup title="" onClose={onClose}>
      <img
        src={card.link}
        alt={card.name}
        className="popup__image"
      />
    </Popup>
  );
}
