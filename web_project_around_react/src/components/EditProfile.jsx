function EditProfile({ values, onChange, onSubmit }) {
  return (
    <form
      className="popup__form"
      id="edit-profile-form"
      noValidate
      onSubmit={onSubmit}
    >
      <input
        id="owner-name"
        className="popup__input popup__input_type_name"
        name="name"
        placeholder="Nombre"
        type="text"
        required
        minLength="2"
        maxLength="40"
        value={values.name}
        onChange={onChange}
      />
      <span className="popup__error" id="owner-name-error"></span>

      <input
        id="owner-description"
        className="popup__input popup__input_type_description"
        name="description"
        placeholder="Acerca de mí"
        type="text"
        required
        minLength="2"
        maxLength="200"
        value={values.description}
        onChange={onChange}
      />
      <span className="popup__error" id="owner-description-error"></span>

      <button className="popup__button" type="submit">
        Guardar
      </button>
    </form>
  )
}

export default EditProfile
