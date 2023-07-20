import Footer from "./Footer/Footer.jsx";
import Header from "./Header/Header.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import Main from "./Main/Main.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import { useCallback, useState, useEffect } from "react";
import CurrentUserContext from "../../src/contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

function App() {
  //стейты попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isImagePopup, setIsImagePopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isSending, setIsSending] = useState(false)
  // стейт контекста
  const [currentUser, setCurrentUser] = useState({});

  //стейты карточки
  const [cards, setCards] = useState([]);
  const [isLoadingCards, setIsLoadingCards] = useState(true);
  const [deleteCard, setDeleteCard] = useState('')

  const setStatesForClosePopup = useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopup(false);
    setIsDeletePopupOpen(false);
  }, []);

  const closePopupByEsc = useCallback(
    (evt) => {
      if (evt.key === "Escape") {
        setStatesForClosePopup();
        document.removeEventListener("keydown", closePopupByEsc);
      }
    },
    [setStatesForClosePopup]
  );

  const closePopup = useCallback(() => {
    setStatesForClosePopup();
    document.removeEventListener("keydown", closePopupByEsc);
  }, [setStatesForClosePopup, closePopupByEsc]);

  function setEventListenerForDocument() {
    document.addEventListener("keydown", closePopupByEsc);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setEventListenerForDocument();
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setEventListenerForDocument();
  }

  function handleDeletePopupClick(cardId) {
    setDeleteCard(cardId)
    setIsDeletePopupOpen(true);
    setEventListenerForDocument();
    
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setEventListenerForDocument();
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopup(true);
    setEventListenerForDocument();
  }

  useEffect(() => {
    setIsLoadingCards(true);
    Promise.all([api.getInfo(), api.getCards()])
      .then(([dataUser, dataCard]) => {
        setCurrentUser(dataUser);
        setCards(dataCard);
        setIsLoadingCards(false);
      })
      .catch((error) => console.error(`Ошибка редактирования ${error}`));
  }, []);

  function handleSubmitDeletion(evt){
    evt.preventDefault()
    setIsSending(true)
    api.removeCard(deleteCard)
    .then(()=>{
    setCards(cards.filter((card) =>{
      return card._id !== deleteCard
    }))
    closePopup()
  })
  .catch((error) => console.error(`Ошибка редактирования ${error}`))
  .finally(()=> setIsSending(false))
  
}

function handleUpdateUser (dataUser, reset){
  setIsSending(true)
  api.setUserInfo(dataUser)
  .then(res=>{
    setCurrentUser(res)
    closePopup()
    reset()
    setIsSending(false)
  })
  .catch((error) => console.error(`Ошибка редактирования ${error}`))
  .finally(()=> setIsSending(false))
}


function handleUpdateAvatar(dataUser, reset){
  setIsSending(true)
  api.setNewAvatar(dataUser)
  .then(res=>{
    setCurrentUser(res)
    closePopup()
    reset()
    setIsSending(false)
  })
  .catch((error) => console.error(`Ошибка редактирования ${error}`))
  .finally(()=> setIsSending(false))
}

function handleAddCard(dataCard, reset){
  setIsSending(true)
  api.addCards(dataCard)
  .then(res=>{
    setCards([res, ...cards]); 
    closePopup()
    reset()
    setIsSending(false)
  })
  .catch((error) => console.error(`Ошибка редактирования ${error}`))
  .finally(()=> setIsSending(false))
}

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <SendContext.Provider value={isSending}>
          <Routes>
            <Route path='/'
            element={<ProtectedRoute
              element={ProtectedPage}
              userEmail={userEmail}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onDelete={handleDeletePopupClick}
              cards={cards}
              isLoading={isLoadingCards}
          // onCardLike={handleLike}
          // loggedIn={loggedIn}
              />
              }
              />
            <Route path='/sign-up' element={
              <>
                <Header name='signup' />
                <Main name='signup' handleRegister={handleRegister} />
              </>
            }
            />
            <Route path='/sign-in' element={
                <>
                  <Header name='signin' />
                  <Main name='signin' handleLogin={handleLogin} />
                </>
              }
            />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </SendContext.Provider>

        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onDelete={handleDeletePopupClick}
          cards={cards}
          isLoading={isLoadingCards}
        />

        <Footer />

        <SendContext.Provider value={isSending}>
          <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closePopup}
          isSend ={isSending}
        />

        <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closePopup}
        isSend ={isSending}
        onAddPlace={handleAddCard}
        />

        <EditAvatarPopup
         onUpdateAvatar={handleUpdateAvatar}
         isOpen={isEditAvatarPopupOpen}
         onClose={closePopup}
         isSend ={isSending}
        />


        {/* <DeletePopup
        onClose={closePopup}
        isOpen={isDeletePopupOpen}
        onSubmit={handleSubmitDeletion}
        /> */}
         </SendContext.Provider>

        <PopupWithForm
          name="delete-popup"
          title="Вы уверены?"
          titleButton="Да "
          onClose={closePopup}
          isOpen={isDeletePopupOpen}
          onSubmit={handleSubmitDeletion}
          isSend={isSending}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopup}
          onClose={closePopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
