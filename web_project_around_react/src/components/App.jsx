import { useEffect, useState } from 'react'
import Header from './Header/Header'
import Main from './Main/Main'
import Footer from './Footer/Footer'
import api from '../utils/api'
import CurrentUserContext from '../contexts/CurrentUserContext'

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
    const isLiked = Boolean(card.isLiked)

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
            activePopup={activePopup}
            selectedCard={selectedCard}
            onClosePopup={handleClosePopup}
            onAddPlaceSubmit={handleAddPlaceSubmit}
            onConfirmDeleteCard={handleConfirmDeleteCard}
          />
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
