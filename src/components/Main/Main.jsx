import { useEffect, useState } from 'react'
import api from '../../utils/api'
import Card from '../Card/Card.jsx'

export default function Main ({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick
}) {
  const [userName, setUserName] = useState('')
  const [userInfo, setUserInfo] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [cards, setCards] = useState([])

  useEffect(() => {
    Promise.all([api.getInfo(), api.getCards()]).then(
      ([dataUser, dataCard]) => {
        setUserName(dataUser.name)
        setUserInfo(dataUser.about)
        setUserAvatar(dataUser.avatar)
        dataCard.forEach(data => (data.myid = dataUser._id))
        setCards(dataCard)
      }
    )
    .catch((error => console.error(`Ошибка редактирования ${error}`)))
  }, [])
  

  return (
    <main className='main'>
      <section className='profile'>
        <div className='profile__container'>
          <button
            className='profile__avatar-button button'
            onClick={onEditAvatar}
          >
            <img
              className='profile__avatar'
              src={userAvatar}
              alt='Аватар пользователя'
            />
          </button>
          <div className='profile__info'>
            <div className='profile__personal-info'>
              <h1 className='profile__name'>{userName} </h1>
              <button
                className='profile__edit-button button'
                type='button'
                onClick={onEditProfile}
              />
            </div>
            <p className='profile__job'>{userInfo}</p>
          </div>
        </div>
        <button
          className='profile__add-button button'
          type='button'
          onClick={onAddPlace}
        />
      </section>
      <section className='elements'>
        <ul className='elements__container'>
          {cards.map(data => {
            return (
              <li className='elements__card-container' key={data._id}>
                <Card card={data} onCardClick={onCardClick} />
              </li>
            )
          })}
        </ul>
      </section>
    </main>
  )
}
