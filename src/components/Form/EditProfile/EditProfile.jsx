// src/components/Form/EditProfile/EditProfile.jsx
import "../../../blocks/popup.css";




export default function EditProfile() {
  return (
    <form className="popup__form" name="profile-form" noValidate>
      <h2 className="popup__title">Editar perfil</h2>

      <label htmlFor="name" className="popup__label"></label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Nombre"
        className="popup__input"
        required
      />
      <span className="popup__input-error" id="name-error"></span>

      <label htmlFor="about" className="popup__label"></label>
      <input
        type="text"
        id="about"
        name="about"
        placeholder="Sobre mí"
        className="popup__input"
        required
      />
      <span className="popup__input-error" id="about-error"></span>

      <button type="submit" className="popup__save-button">
        Guardar
      </button>
    </form>
  );
}
