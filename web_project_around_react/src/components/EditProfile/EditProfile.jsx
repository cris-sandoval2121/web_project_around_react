import { useContext, useEffect, useState } from 'react'
import CurrentUserContext from '../../contexts/CurrentUserContext'

function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext)
  const [name, setName] = useState(currentUser.name || '')
  const [description, setDescription] = useState(currentUser.about || '')

  useEffect(() => {
    setName(currentUser.name || '')
    setDescription(currentUser.about || '')
  }, [currentUser])

  const handleSubmit = (event) => {
    event.preventDefault()
    handleUpdateUser({ name, about: description })
  }

  return (
    <form
      className="popup__form"
      id="edit-profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        id="owner-name"
        className="popup__input popup__input_type_name"
        name="userName"
        placeholder="Nombre"
        type="text"
        required
        minLength="2"
        maxLength="40"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <span className="popup__error" id="owner-name-error"></span>

      <input
        id="owner-description"
        className="popup__input popup__input_type_description"
        name="userDescription"
        placeholder="Acerca de mi"
        type="text"
        required
        minLength="2"
        maxLength="200"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <span className="popup__error" id="owner-description-error"></span>

      <button className="popup__button" type="submit">
        Guardar
      </button>
    </form>
  )
}

export default EditProfile
