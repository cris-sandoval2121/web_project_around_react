import { useContext } from 'react'
import avatarImage from '../../images/avatar.jpg'
import Card from '../Card/Card'
import CurrentUserContext from '../../contexts/CurrentUserContext'

function Main({
  cards,
  onCardClick,
  onCardLike,
  onCardDelete,
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
}) {
  const { currentUser } = useContext(CurrentUserContext)
  const profileName = currentUser.name || ''
  const profileAbout = currentUser.about || ''
  const profileAvatar = currentUser.avatar || avatarImage

  return (
    <main className="content">
      <section className="profile page__section">
        <button
          aria-label="Cambiar foto de perfil"
          className="profile__avatar-button"
          type="button"
          onClick={onEditAvatarClick}
        >
          <img
            className="profile__image"
            src={profileAvatar}
            alt={`Avatar de ${profileName || 'usuario'}`}
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__title">{profileName}</h1>
          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={onEditProfileClick}
          ></button>
          <p className="profile__description">{profileAbout}</p>
        </div>
        <button
          aria-label="Agregar tarjeta"
          className="profile__add-button"
          type="button"
          onClick={onAddPlaceClick}
        ></button>
      </section>

      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Main
