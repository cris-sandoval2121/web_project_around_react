import { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Footer from './components/Footer/Footer'
import EditProfile from './components/EditProfile/EditProfile'
import EditAvatar from './components/EditAvatar/EditAvatar'
import NewCard from './components/NewCard/NewCard'
import Popup from './components/Popup/Popup'
import ImagePopup from './components/ImagePopup/ImagePopup'
import RemoveCard from './components/RemoveCard/RemoveCard'
import api from './utils/api'
import CurrentUserContext from './contexts/CurrentUserContext'

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [activePopup, setActivePopup] = useState('')
  const [selectedCard, setSelectedCard] = useState(null)
  const [cardToDelete, setCardToDelete] = useState(null)

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCardList()])
      .then(([userData, cardData]) => {
        setCurrentUser(userData)
        setCards(cardData)
      })
      .catch((error) => console.error(error))
  }, [])

  const handleOpenPopup = (popupName, card = null) => {
    setSelectedCard(card)
    setActivePopup(popupName)
  }

  const handleClosePopup = () => {
    setActivePopup('')
    setSelectedCard(null)
    setCardToDelete(null)
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((like) => like._id === currentUser._id)

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard,
          ),
        )
      })
      .catch((error) => console.error(error))
  }

  const handleCardDelete = (card) => {
    setCardToDelete(card)
    handleOpenPopup('confirm-delete')
  }

  const handleConfirmDeleteCard = () => {
    if (!cardToDelete) {
      return
    }

    api
      .deleteCard(cardToDelete._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== cardToDelete._id),
        )
        handleClosePopup()
      })
      .catch((error) => console.error(error))
  }

  const handleUpdateUser = (data) => {
    api
      .setUserInfo(data)
      .then((updatedUser) => {
        setCurrentUser(updatedUser)
        handleClosePopup()
      })
      .catch((error) => console.error(error))
  }

  const handleUpdateAvatar = (data) => {
    api
      .setUserAvatar(data)
      .then((updatedUser) => {
        setCurrentUser(updatedUser)
        handleClosePopup()
      })
      .catch((error) => console.error(error))
  }

  const handleAddPlaceSubmit = (data) => {
    api
      .addCard(data)
      .then((newCard) => {
        setCards((state) => [newCard, ...state])
        handleClosePopup()
      })
      .catch((error) => console.error(error))
  }

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
    >
      <div className="page">
        <div className="page__content">
          <Header />
          <Main
            cards={cards}
            onCardClick={(card) => handleOpenPopup('image', card)}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onEditAvatarClick={() => handleOpenPopup('edit-avatar')}
            onEditProfileClick={() => handleOpenPopup('edit-profile')}
            onAddPlaceClick={() => handleOpenPopup('new-card')}
          />
          <Footer />

          <Popup
            title="Editar perfil"
            isOpen={activePopup === 'edit-profile'}
            onClose={handleClosePopup}
          >
            <EditProfile
              key={`${currentUser._id || 'guest'}-${activePopup === 'edit-profile'}`}
            />
          </Popup>

          <Popup
            title="Nuevo lugar"
            isOpen={activePopup === 'new-card'}
            onClose={handleClosePopup}
          >
            <NewCard
              key={activePopup === 'new-card' ? 'new-card-open' : 'new-card-closed'}
              onAddPlaceSubmit={handleAddPlaceSubmit}
            />
          </Popup>

          <Popup
            title="Cambiar foto de perfil"
            isOpen={activePopup === 'edit-avatar'}
            onClose={handleClosePopup}
          >
            <EditAvatar isOpen={activePopup === 'edit-avatar'} />
          </Popup>

          <Popup
            title="Eliminar tarjeta"
            isOpen={activePopup === 'confirm-delete'}
            onClose={handleClosePopup}
          >
            <RemoveCard onDeleteConfirm={handleConfirmDeleteCard} />
          </Popup>

          <ImagePopup isOpen={activePopup === 'image'} onClose={handleClosePopup}>
            {selectedCard ? (
              <>
                <img
                  alt={selectedCard.name}
                  className="popup__image"
                  src={selectedCard.link}
                />
                <p className="popup__caption">{selectedCard.name}</p>
              </>
            ) : null}
          </ImagePopup>
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
