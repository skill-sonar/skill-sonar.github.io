import { NavLink } from 'react-router-dom'
import './Nav.css'

export default function Nav() {
  return (
    <header className="nav">
      <div className="nav__inner">
        <div className="nav__brand">
          <span className="nav__brand-icon">🛡</span>
          <span className="nav__brand-text">Skill Safety</span>
        </div>
        <nav className="nav__links">
          <NavLink
            to="/skill-sonar"
            className={({ isActive }) =>
              'nav__link' + (isActive ? ' nav__link--active' : '')
            }
          >
            Skill Sonar
          </NavLink>
          <NavLink
            to="/scanner"
            className={({ isActive }) =>
              'nav__link nav__link--cta' + (isActive ? ' nav__link--cta-active' : '')
            }
          >
            Try Scanner
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
