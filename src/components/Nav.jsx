import { NavLink, useLocation } from 'react-router-dom'
import './Nav.css'

export default function Nav() {
  const location = useLocation()

  return (
    <header className="nav">
      <div className="nav__inner">
        <div className="nav__brand">
          <img src="/skill-sonar.png" alt="" className="nav__brand-icon" />
          <span className="nav__brand-text">Skill Safety</span>
        </div>
        <nav className="nav__links">
          <NavLink
            to="/skill-sonar"
            className={({ isActive }) =>
              'nav__link nav__link--skill' + (isActive || location.pathname === '/' ? ' nav__link--skill-active' : '')
            }
          >
            Skill Sonar
          </NavLink>
          <NavLink
            to="/scanner"
            className={({ isActive }) =>
              'nav__link nav__link--scanner' + (isActive ? ' nav__link--scanner-active' : '')
            }
          >
            Try Scanner
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
