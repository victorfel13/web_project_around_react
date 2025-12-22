import { useState, useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

export default function EditAvatar({ onClose }) {
  const { currentUser, handleUpdateAvatar } = useContext(CurrentUserContext);
  const [avatar, setAvatar] = useState(currentUser.avatar || "");

  const handleChange = (e) => setAvatar(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateAvatar({ avatar });
    onClose();
  };

  return (
    <form className="popup__form" noValidate onSubmit={handleSubmit}>
      <input
        type="url"
        className="popup__input"
        placeholder="URL del avatar"
        value={avatar}
        onChange={handleChange}
        required
      />
      <button type="submit" className="button popup__button">Guardar</button>
    </form>
  );
}
