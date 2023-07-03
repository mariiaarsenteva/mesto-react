export default function PopupWithForm({name, title, titleButton, children, isOpen, onClose}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button
          className="popup__close-button button" 
          type="button"
          id="close-profile"
          aria-label="Закрыть"
          onClick={onClose}    />
        <form noValidate=""  className="popup__form" name={name}>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button
            className="popup__submit-button button"
            type="submit"
            aria-label="Сохранить">
            {titleButton || 'Сохранить'}
          </button>
        </form>
      </div>
    </div>
  );
}
