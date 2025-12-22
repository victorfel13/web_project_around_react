import { useRef } from "react";

export default function NewCard({ onClose, onAddPlace }) {
  const nameRef = useRef();
  const linkRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
    onClose();
  };

  return (
    <form className="popup__form" onSubmit={handleSubmit} noValidate>
      <input type="text" placeholder="Nombre" className="popup__input" ref={nameRef} required />
      <input type="url" placeholder="URL de la imagen" className="popup__input" ref={linkRef} required />
      <button type="submit" className="popup__save-button enabled">Guardar</button>
    </form>
  );
}
