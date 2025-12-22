import { useState, useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import api from "../../utils/api";

export default function NewCard({ onClose }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    api.addCard({ name, link })
      .then(() => onClose())
      .catch(console.error);
  };

  return (
    <form className="popup__form" noValidate onSubmit={handleSubmit}>
      <input
        className="popup__input"
        placeholder="Nombre del lugar"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="popup__input"
        placeholder="URL de la imagen"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        required
      />
      <button type="submit" className="button popup__button">Agregar</button>
    </form>
  );
}
