import { useState } from 'react'

function NewCard({ onAddPlaceSubmit }) {
  const [name, setName] = useState('')
  const [link, setLink] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onAddPlaceSubmit({ name, link })
  }

  return (
    <form
      className="popup__form"
      id="new-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        id="card-title"
        className="popup__input popup__input_type_card-name"
        name="name"
        placeholder="Titulo"
        required
        type="text"
        minLength="2"
        maxLength="30"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <span className="popup__error" id="card-title-error"></span>

      <input
        id="card-url"
        className="popup__input popup__input_type_url"
        name="link"
        placeholder="Enlace a la imagen"
        required
        type="url"
        value={link}
        onChange={(event) => setLink(event.target.value)}
      />
      <span className="popup__error" id="card-url-error"></span>

      <button className="popup__button" type="submit">
        Crear
      </button>
    </form>
  )
}

export default NewCard
