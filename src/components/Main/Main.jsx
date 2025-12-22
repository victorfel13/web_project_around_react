import React, { useState, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Card from "../Card/Card";
import Popup from "../Popup/ImagePopup/ImagePopup";

import EditProfile from "../Form/EditProfile/EditProfile";
import EditAvatar from "../Form/EditAvatar/EditAvatar";
import NewCard from "../Form/NewCard/NewCard";

export default function Main({ cards, onCardLike, onCardDelete, onAddPlace }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [popup, setPopup] = useState(null);

  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile onClose={() => setPopup(null)} />,
  };

  const editAvatarPopup = {
    title: "Editar avatar",
    children: <EditAvatar onClose={() => setPopup(null)} />,
  };

  const newCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard onClose={() => setPopup(null)} onAddPlace={onAddPlace} />,
  };

  const handleOpenPopup = (popupData) => setPopup(popupData);
  const handleClosePopup = () => setPopup(null);

  const handleCardClick = (card) => {
    setPopup({
      title: "",
      children: (
        <img
          src={card.link}
          alt={card.name}
          style={{
            width: "90vw",
            maxHeight: "80vh",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      ),
    });
  };

  // Evitar renderizar si no hay usuario o tarjetas
  if (!currentUser._id) return <p>Cargando usuario...</p>;

  return (
    <>
      {/* Perfil y botones */}
      <section className="profile">
        <div className="avatar-container">
          <img
            src={currentUser.avatar || "/images/image.jpg"}
            alt={`Foto de perfil de ${currentUser.name || "Usuario"}`}
            className="avatar"
            onClick={() => handleOpenPopup(editAvatarPopup)}
          />
          <button
            className="avatar-edit-btn"
            aria-label="Editar avatar"
            onClick={() => handleOpenPopup(editAvatarPopup)}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name || "Nombre"}</h1>
          <p className="profile__job">{currentUser.about || "Descripción"}</p>
          <button
            className="edit-button"
            aria-label="Editar perfil"
            onClick={() => handleOpenPopup(editProfilePopup)}
          >
            <img src="/images/Pencil.svg" alt="Editar perfil" />
          </button>
        </div>
        <button
          className="add-button"
          aria-label="Agregar nueva tarjeta"
          onClick={() => handleOpenPopup(newCardPopup)}
        >
          <img src="/images/AddButton.png" alt="Agregar tarjeta" />
        </button>
      </section>

      <ul className="cards__list">
        {cards.map((card) => {
          // Proteger contra likes undefined
          const likesArray = Array.isArray(card.likes) ? card.likes : [];
          const isLiked = likesArray.some((u) => u._id === currentUser._id);

          return (
            <Card
              key={card._id}
              card={card}
              isLiked={isLiked}
              onCardClick={() => handleCardClick(card)}
              onCardLike={() => onCardLike(card)}
              onCardDelete={() => onCardDelete(card)}
            />
          );
        })}
      </ul>

      {popup && <Popup title={popup.title} onClose={handleClosePopup}>{popup.children}</Popup>}
    </>
  );
}
