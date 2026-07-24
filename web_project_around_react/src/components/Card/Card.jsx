import { useState } from 'react'

function Card({ name, link, onDelete, onImageClick }) {
  const [isLiked, setIsLiked] = useState(false)

  const likeButtonClassName = `card__like-button${isLiked ? ' card__like-button_is-active' : ''}`

  return (
    <li className="card">
      <button
        className="card__image-button"
        type="button"
        aria-label={`Ver ${name}`}
        onClick={onImageClick}
      >
        <img className="card__image" src={link} alt={name} />
      </button>
      <button
        aria-label={`Eliminar tarjeta ${name}`}
        className="card__delete-button"
        type="button"
        onClick={onDelete}
      ></button>
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label={isLiked ? `Quitar me gusta a ${name}` : `Dar me gusta a ${name}`}
          className={likeButtonClassName}
          type="button"
          onClick={() => setIsLiked((currentValue) => !currentValue)}
        ></button>
      </div>
    </li>
  )
}

export default Card
