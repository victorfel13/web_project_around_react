import React from "react";
import "../../blocks/card.css";

export default function Card({ card, onCardClick, onCardLike, onCardDelete, isLiked }) {
  const { name, link } = card;

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card" style={{ position: "relative" }}>
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={onCardClick}
        style={{ cursor: "pointer" }}
      />
      <button
        aria-label="Eliminar tarjeta"
        className="card__delete-button"
        type="button"
        onClick={handleDeleteClick}
      >
        <img src="/images/Trash.svg" alt="Eliminar tarjeta" />
      </button>
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Me gusta"
          type="button"
          onClick={handleLikeClick}
          className={`card__like-button ${isLiked ? "card__like-button_is-active" : ""}`}
        />
      </div>
    </li>
  );
}
