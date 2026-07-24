import { useState } from 'react'
import avatarImage from '../images/avatar.jpg'
import { initialCards, initialProfile } from '../../utils/constants'
import Card from '../Card/Card'
import EditAvatar from '../EditAvatar/EditAvatar'
import EditProfile from '../EditProfile/EditProfile'
import NewCard from '../NweCard/NewCard'
import ImagePopup from '../ImagePopup/ImagePopup'

function Main() {
  const [profile, setProfile] = useState({
    ...initialProfile,
    avatar: avatarImage,
  })
  const [cards, setCards] = useState(initialCards)
  const [activePopup, setActivePopup] = useState('')
  const [selectedCard, setSelectedCard] = useState(null)
  const [profileFormValues, setProfileFormValues] = useState({name: initialProfile.name, description: initialProfile.description,})
  const [newCardValues, setNewCardValues] = useState({name: '',link: '',
  })
  const [avatarFormValues, setAvatarFormValues] = useState({
    avatar: '',
  })

  const handleOpenPopup = (popupName, card = null) => {
    if (popupName === 'edit-profile') {
      setProfileFormValues({
        name: profile.name,
        description: profile.description,
      })
    }

    if (popupName === 'new-card') {
      setNewCardValues({
        name: '',
        link: '',
      })
    }

    if (popupName === 'edit-avatar') {
      setAvatarFormValues({
        avatar: '',
      })
    }

    setSelectedCard(card)
    setActivePopup(popupName)
  }

  const handleClosePopup = () => {
    setActivePopup('')
    setSelectedCard(null)
  }

  const handleProfileChange = (event) => {
    const { name, value } = event.target

    setProfileFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))
  }

  const handleNewCardChange = (event) => {
    const { name, value } = event.target

    setNewCardValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))
  }

  const handleAvatarChange = (event) => {
    const { name, value } = event.target

    setAvatarFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))
  }

  const handleProfileSubmit = (event) => {
    event.preventDefault()

    setProfile((currentProfile) => ({
      ...currentProfile,
      name: profileFormValues.name,
      description: profileFormValues.description,
    }))

    handleClosePopup()
  }

  const handleNewCardSubmit = (event) => {
    event.preventDefault()

    const nextCard = {
      id: `card-${Date.now()}`,
      name: newCardValues.name,
      link: newCardValues.link,
    }

    setCards((currentCards) => [nextCard, ...currentCards])
    handleClosePopup()
  }

  const handleAvatarSubmit = (event) => {
    event.preventDefault()

    setProfile((currentProfile) => ({
      ...currentProfile,
      avatar: avatarFormValues.avatar,
    }))

    handleClosePopup()
  }

  const handleDeleteCard = (cardId) => {
    setCards((currentCards) =>
      currentCards.filter((card) => card.id !== cardId),
    )
  }

  return (
    <>
      <main className="content">
        <section className="profile page__section">
          <button
            aria-label="Cambiar foto de perfil"
            className="profile__avatar-button"
            type="button"
            onClick={() => handleOpenPopup('edit-avatar')}
          >
            <img
              className="profile__image"
              src={profile.avatar}
              alt={`Avatar de ${profile.name}`}
            />
          </button>
          <div className="profile__info">
            <h1 className="profile__title">{profile.name}</h1>
            <button
              aria-label="Editar perfil"
              className="profile__edit-button"
              type="button"
              onClick={() => handleOpenPopup('edit-profile')}
            ></button>
            <p className="profile__description">{profile.description}</p>
          </div>
          <button
            aria-label="Agregar tarjeta"
            className="profile__add-button"
            type="button"
            onClick={() => handleOpenPopup('new-card')}
          ></button>
        </section>

        <section className="cards page__section">
          <ul className="cards__list">
            {cards.map((card) => (
              <Card
                key={card.id}
                name={card.name}
                link={card.link}
                onDelete={() => handleDeleteCard(card.id)}
                onImageClick={() => handleOpenPopup('image', card)}
              />
            ))}
          </ul>
        </section>
      </main>

      <ImagePopup
        title="Editar perfil"
        isOpen={activePopup === 'edit-profile'}
        onClose={handleClosePopup}
      >
        <EditProfile
          values={profileFormValues}
          onChange={handleProfileChange}
          onSubmit={handleProfileSubmit}
        />
      </ImagePopup>

      <ImagePopup
        title="Nuevo lugar"
        isOpen={activePopup === 'new-card'}
        onClose={handleClosePopup}
      >
        <NewCard
          values={newCardValues}
          onChange={handleNewCardChange}
          onSubmit={handleNewCardSubmit}
        />
      </ImagePopup>

      <ImagePopup
        title="Cambiar foto de perfil"
        isOpen={activePopup === 'edit-avatar'}
        onClose={handleClosePopup}
      >
        <EditAvatar
          values={avatarFormValues}
          onChange={handleAvatarChange}
          onSubmit={handleAvatarSubmit}
        />
      </ImagePopup>

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
    </>
  )
}

export default Main
