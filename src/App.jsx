import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import CurrentUserContext from "./contexts/CurrentUserContext";
import api from "./utils/api";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]); // Levantamos cards aquí

  useEffect(() => {
    api.getUserInfo()
      .then(setCurrentUser)
      .catch(console.error);

    api.getInitialCards() // Traemos las tarjetas iniciales
      .then(setCards)
      .catch(console.error);
  }, []);

  const handleUpdateUser = (data) => {
    api.setUserInfo(data)
      .then(setCurrentUser)
      .catch(console.error);
  };

  const handleUpdateAvatar = (data) => {
    api.setUserAvatar(data)
      .then(setCurrentUser)
      .catch(console.error);
  };

  // Manejadores de tarjetas
  const handleCardLike = async (card) => {
    const isLiked = card.likes.some(u => u._id === currentUser._id);
    try {
      const newCard = await api.changeLikeCardStatus(card._id, !isLiked);
      setCards(state => state.map(c => c._id === card._id ? newCard : c));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCardDelete = async (card) => {
    try {
      await api.deleteCard(card._id);
      setCards(state => state.filter(c => c._id !== card._id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddPlaceSubmit = async (newCardData) => {
    try {
      const newCard = await api.addCard(newCardData); // API crea nueva tarjeta
      setCards([newCard, ...cards]); // Nueva tarjeta al principio
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}>
      <div className="page">
        <div className="page__content">
          <Header />
          <Main
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onAddPlace={handleAddPlaceSubmit} // Para NewCard
          />
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
