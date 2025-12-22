import React, { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import api from "../utils/api";
import Card from "../Card/Card";
import Popup from "./Popup/Popup";


import EditProfile from "../Form/EditProfile/EditProfile";
import EditAvatar from "../Form/EditAvatar/EditAvatar";
import NewCard from "../Form/NewCard/NewCard";

export default function Main() {
  const { currentUser } = useContext(CurrentUserContext);
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    api.getInitialCards()
      .then(setCards)
      .catch(console.error);
  }, []);

  function handleOpenPopup(popupData) {
    setPopup(popupData);
  }

  function handleClosePopup() {
    setPopup(null);
  }

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

  async function handleCardLike(card) {
    const isLiked = card.likes.some((u) => u._id === currentUser._id);
    try {
      const newCard = await api.changeLikeCardStatus(card._id, !isLiked);
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    } catch (error) {
      console.error(error);
    }
  }

  function handleCardClick(card) {
    setPopup({
      title: "",
      children: (
        <img
          src={card.link}
          alt={card.name}
          style={{ width: "90vw", maxHeight: "80vh", objectFit: "cover", borderRadius: "8px" }}
        />
      ),
    });
  }

  async function handleCardDelete(card) {
    try {
      await api.deleteCard(card._id);
      setCards((state) => state.filter((c) => c._id !== card._id));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <section className="profile">
        <div className="avatar-container">
          <img
            src={currentUser.avatar || "/images/image.jpg"}
            alt={`Foto de perfil de ${currentUser.name || "Usuario"}`}
            className="avatar"
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
          const isLiked = card.likes.some((u) => u._id === currentUser._id);
          return (
            <Card
              key={card._id}
              card={card}
              isLiked={isLiked}
              onCardClick={() => handleCardClick(card)}
              onCardLike={() => handleCardLike(card)}
              onCardDelete={() => handleCardDelete(card)}
            />
          );
        })}
      </ul>
      {popup && <Popup title={popup.title} onClose={handleClosePopup}>{popup.children}</Popup>}
    </>
  );
}
