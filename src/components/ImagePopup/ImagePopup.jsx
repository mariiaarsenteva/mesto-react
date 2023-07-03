export default function ImagePopup() {
  return (
    <div className="popup image-popup">
      <div className="popup__image-container">
        <button
          className="popup__close-button button"
          type="button"
          aria-label="Закрыть"
        />
        <figure className="figure">
          <img src="#" alt="#" className="figure__image" />
          <figcaption className="figure__caption" />
        </figure>
      </div>
    </div>
  );
}
