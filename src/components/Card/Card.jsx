export default function Card ({ card, onCardClick }) {
  return (
    <div>
      <button
        className='elements__delete-button button'
        type='button'
        aria-label='Удалить'
      />
      <img
        className='elements__photo'
        src={card.link}
        alt={card.name}
        onClick={() => onCardClick({ link: card.link, name: card.name })}
      />
      <div className='elements__info'>
        <h2 className='elements__title'>{card.name}</h2>
        <div className='elements__like-container'>
          <button
            className='button elements__like-button'
            type='button'
            aria-label='Нравится'
          ></button>
          <p className='elements__like-counter'>0</p>
        </div>
      </div>
    </div>
  )
}
