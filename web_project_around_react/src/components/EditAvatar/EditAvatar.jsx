function EditAvatar({ values, onChange, onSubmit }) {
  return (
    <form className="popup__form" id="avatar-form" noValidate onSubmit={onSubmit}>
      <input
        id="avatar-url"
        className="popup__input popup__input_type_url"
        name="avatar"
        placeholder="Enlace a la foto"
        required
        type="url"
        value={values.avatar}
        onChange={onChange}
      />
      <span className="popup__error" id="avatar-url-error"></span>

      <button className="popup__button" type="submit">
        Guardar
      </button>
    </form>
  )
}

export default EditAvatar
