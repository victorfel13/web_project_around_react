import React, { useState } from "react";
import Popup from "./Popup/Popup";
import EditProfile from "../Form/EditProfile/EditProfile";
import EditAvatar from "../Form/EditAvatar/EditAvatar";
import NewCard from "../Form/NewCard/NewCard";
import Card from "../Card/Card";

export default function Main() {
  const [popup, setPopup] = useState(null);

  const [cards, setCards] = useState([
    {
      isLiked: false,
      _id: "5d1f0611d321eb4bdcd707dd",
      name: "Yosemite Valley",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
    },
    {
      isLiked: false,
      _id: "5d1f064ed321eb4bdcd707de",
      name: "Lake Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
    },
  ]);

  // -----------------------------
  //  POPUP CONTROLLERS
  // -----------------------------

  function handleOpenPopup(popupData) {
    setPopup(popupData);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  // -----------------------------
  //  PRESETS DE LOS POPUPS
  // -----------------------------

  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile onClose={handleClosePopup} />,
  };

  const editAvatarPopup = {
    title: "Editar avatar",
    children: <EditAvatar onClose={handleClosePopup} />,
  };

  const newCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard onClose={handleClosePopup} />,
  };

 
  //  CARD 


  function handleCardLike(card) {
    setCards((prevCards) =>
      prevCards.map((c) =>
        c._id === card._id ? { ...c, isLiked: !c.isLiked } : c
      )
    );
  }

  function handleCardClick(card) {
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
  }

  
  //  
  

  return (
    <>
      <section className="profile">
        <div className="avatar-container">
          <img
            src="/images/image.jpg"
            alt="Foto de perfil de Jacques Cousteau"
            className="avatar"
          />
          <button
            className="avatar-edit-btn"
            aria-label="Editar avatar"
            onClick={() => handleOpenPopup(editAvatarPopup)}
          />
        </div>

        <div className="profile__info">
          <h1 className="profile__name">Jacques</h1>
          <p className="profile__job">Explorador</p>
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
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={() => handleCardClick(card)}
            onCardLike={handleCardLike}
          />
        ))}
      </ul>

      {popup && (
        <Popup title={popup.title} onClose={handleClosePopup}>
          {popup.children}
        </Popup>
      )}
    </>
  );
}
