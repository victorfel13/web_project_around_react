import { useRef, useContext, useEffect } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

export default function EditAvatar({ onClose }) {
  const { currentUser, handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarRef = useRef();

  // Cada vez que se abre el popup, colocamos el valor actual del avatar
  useEffect(() => {
    if (avatarRef.current) {
      avatarRef.current.value = currentUser.avatar || "";
    }
  }, [currentUser, avatarRef]);

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    onClose();
  }

  return (
    <form className="popup__form" noValidate onSubmit={handleSubmit}>
      <input
        type="url"
        className="popup__input"
        placeholder="URL del avatar"
        ref={avatarRef}
        required
      />
      <button type="submit" className="button popup__button">
        Guardar
      </button>
    </form>
  );
}
