export default function ImagePopup ({ card, isOpen, onClose }) {
  return (
    <div className={`popup image-popup ${isOpen && 'popup_opened'}`}>
      <div className='popup__image-container'>
        <button
          className='popup__close-button button'
          type='button'
          aria-label='Закрыть'
          onClick={onClose}
        />
        <figure className='figure'>
          <img
            src={card.link ? card.link : '#'}
            alt={card.name ? card.name : '#'}
            className='figure__image'
          />
          <figcaption className='figure__caption'>{card.name} </figcaption>
        </figure>
      </div>
    </div>
  )
}
