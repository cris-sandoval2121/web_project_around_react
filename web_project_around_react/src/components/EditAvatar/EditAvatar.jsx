import { useContext, useEffect, useRef } from 'react'
import CurrentUserContext from '../../contexts/CurrentUserContext'

function EditAvatar({ isOpen }) {
  const { handleUpdateAvatar } = useContext(CurrentUserContext)
  const avatarRef = useRef(null)

  useEffect(() => {
    if (isOpen && avatarRef.current) {
      avatarRef.current.value = ''
    }
  }, [isOpen])

  const handleSubmit = (event) => {
    event.preventDefault()

    handleUpdateAvatar({
      avatar: avatarRef.current?.value || '',
    })
  }

  return (
    <form
      className="popup__form"
      id="avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        id="avatar-url"
        className="popup__input popup__input_type_url"
        name="avatar"
        placeholder="Enlace a la foto"
        required
        type="url"
        ref={avatarRef}
      />
      <span className="popup__error" id="avatar-url-error"></span>

      <button className="popup__button" type="submit">
        Guardar
      </button>
    </form>
  )
}

export default EditAvatar
