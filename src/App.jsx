import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import CurrentUserContext from "./contexts/CurrentUserContext";
import api from "./components/utils/api";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api.getUserInfo()
      .then(setCurrentUser)
      .catch(console.error);
  }, []);

  const handleUpdateUser = (data) => {
    api.setUserInfo(data)
      .then((newData) => setCurrentUser(newData))
      .catch(console.error);
  };

  const handleUpdateAvatar = (data) => {
    api.setUserAvatar(data)
      .then((newData) => setCurrentUser(newData))
      .catch(console.error);
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}>
      <div className="page">
        <div className="page__content">
          <Header />
          <Main />
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
