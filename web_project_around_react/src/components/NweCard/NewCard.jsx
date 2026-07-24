function NewCard({ values, onChange, onSubmit }) {
  return (
    <form className="popup__form" id="new-card-form" noValidate onSubmit={onSubmit}>
      <input
        id="card-title"
        className="popup__input popup__input_type_card-name"
        name="name"
        placeholder="Título"
        required
        type="text"
        minLength="2"
        maxLength="30"
        value={values.name}
        onChange={onChange}
      />
      <span className="popup__error" id="card-title-error"></span>

      <input
        id="card-url"
        className="popup__input popup__input_type_url"
        name="link"
        placeholder="Enlace a la imagen"
        required
        type="url"
        value={values.link}
        onChange={onChange}
      />
      <span className="popup__error" id="card-url-error"></span>

      <button className="popup__button" type="submit">
        Crear
      </button>
    </form>
  )
}

export default NewCard
