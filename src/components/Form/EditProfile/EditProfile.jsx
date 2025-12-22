import { useState, useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

export default function EditProfile({ onClose }) {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name || "");
  const [description, setDescription] = useState(currentUser.about || "");

  const handleNameChange = (e) => setName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser({ name, about: description });
    onClose();
  };

  return (
    <form className="popup__form" noValidate onSubmit={handleSubmit}>
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_name"
          placeholder="Nombre"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_description"
          placeholder="Acerca de mí"
          value={description}
          onChange={handleDescriptionChange}
          required
        />
      </label>
      <button className="button popup__button" type="submit">Guardar</button>
    </form>
  );
}
