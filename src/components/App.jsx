import Footer from './Footer/Footer.jsx'
import Header from './Header/Header.jsx'
import ImagePopup from './ImagePopup/ImagePopup.jsx'
import Main from './Main/Main.jsx'
import PopupWithForm from './PopupWithForm/PopupWithForm.jsx'
import { useState } from 'react'

function App () {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState([])
  const [isImagePopup, setIsImagePopup] = useState(false)

  function closePopup () {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsImagePopup(false)
  }
  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true)
  }

  function handleCardClick (card) {
    setSelectedCard(card)
    setIsImagePopup(true)
  }

  return (
    <div className='page'>
      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />

      <Footer />

      <PopupWithForm
        name='profile-popup'
        title='Редактировать профиль'
        isOpen={isEditProfilePopupOpen}
        onClose={closePopup}
      >
        <input
          type='text'
          id='name'
          placeholder='Имя'
          name='name'
          defaultValue=''
          className='popup__input popup__input_name'
          minLength={2}
          maxLength={40}
          required=''
        />
        <span className='popup__error popup__error_name' />
        <input
          type='text'
          id='job'
          placeholder='Описание'
          name='job'
          defaultValue=''
          className='popup__input popup__input_job'
          minLength={2}
          maxLength={200}
          required=''
        />
        <span className='popup__error popup__error_job' />
      </PopupWithForm>

      <PopupWithForm
        name='card-popup'
        title='Новое место'
        titleButton='Создать'
        isOpen={isAddPlacePopupOpen}
        onClose={closePopup}
      >
        <input
          type='text'
          id='title'
          placeholder='Название'
          name='title'
          defaultValue=''
          className='popup__input popup__input_title'
          minLength={2}
          maxLength={30}
          required=''
        />
        <span className='popup__error popup__error_title' />
        <input
          type='url'
          id='link'
          placeholder='Ссылка на картинку'
          name='link'
          defaultValue=''
          className='popup__input popup__input_link'
          required=''
        />
        <span className='popup__error popup__error_link' />
      </PopupWithForm>

      <PopupWithForm
        name='avatar-popup'
        title='Обновить аватар'
        isOpen={isEditAvatarPopupOpen}
        onClose={closePopup}
      >
        <input
          type='url'
          id='avatar'
          placeholder='Ссылка на картинку'
          name='avatar'
          defaultValue=''
          className='popup__input popup__input_avatar'
          required=''
        />
        <span className='popup__error popup__error_avatar' />
      </PopupWithForm>

      <PopupWithForm
        name='delete-popup'
        title='Вы уверены?'
        titleButton='Да '
        onClose={closePopup}
      />

      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopup}
        onClose={closePopup}
      />
    </div>
  )
}

export default App
