import logo from '../images/logo.svg'

function Header() {
  return (
    <header className="header page__section">
      <img
        src={logo}
        alt="Logotipo Around The U.S."
        className="header__logo"
      />
    </header>
  )
}

export default Header
