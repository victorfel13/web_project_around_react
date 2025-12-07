export default function EditAvatar() {
  return (
    <>
    <div className="popup popup_type_edit-profile">
      <div className="popup__container">
        <button className="popup__close-button" type="button" aria-label="Cerrar">
          &times;
        </button>
        <form className="popup__form" Novalidate>
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

          <button type="submit" className="popup__save-button">Guardar</button>
        </form>
      </div>
    </div></>
  );
}