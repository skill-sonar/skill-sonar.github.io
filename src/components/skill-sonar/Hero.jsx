import { Link } from 'react-router-dom'
import SimulatedDemo from './SimulatedDemo'
import './Hero.css'

export default function SkillSonarHero() {
  return (
    <section className="ss-hero">
      <SimulatedDemo />
      <div className="container">
        <div className="ss-hero__label-row">
          <span className="ss-hero__badge ss-hero__badge--preflight">Preflight</span>
          <span className="ss-hero__badge-sep">+</span>
          <span className="ss-hero__badge ss-hero__badge--runtime">Runtime</span>
          <span className="ss-hero__badge ss-hero__badge--zero">Zero Install</span>
        </div>

        <h1 className="ss-hero__title">Skill Sonar</h1>
        <p className="ss-hero__tagline">One Skill. Full Lifecycle. Zero Install.</p>
        <p className="ss-hero__desc">
          The security guard that covers your AI agent from skill installation to task execution —
          entirely through reasoning. No CLI, no cloud, no dependencies. Just add the skill and go.
        </p>

        <div className="ss-hero__stats">
          <div className="ss-hero__stat">
            <span className="ss-hero__stat-num">9</span>
            <span className="ss-hero__stat-label">Pre-install risk areas</span>
          </div>
          <div className="ss-hero__stat-divider" />
          <div className="ss-hero__stat">
            <span className="ss-hero__stat-num">6</span>
            <span className="ss-hero__stat-label">Runtime stage guards</span>
          </div>
          <div className="ss-hero__stat-divider" />
          <div className="ss-hero__stat">
            <span className="ss-hero__stat-num">4</span>
            <span className="ss-hero__stat-label">Trust levels (P0–P3)</span>
          </div>
          <div className="ss-hero__stat-divider" />
          <div className="ss-hero__stat">
            <span className="ss-hero__stat-num">0</span>
            <span className="ss-hero__stat-label">Dependencies</span>
          </div>
        </div>

        <div className="ss-hero__cta">
          <a href="https://clawhub.ai/yxf203/skill-sonar" target="_blank" rel="noopener noreferrer" className="ss-hero__btn ss-hero__btn--primary">
            Install Now
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v7M3.5 5.5L7 9l3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <Link to="/scanner" className="ss-hero__btn ss-hero__btn--secondary">
            Try Scanner →
          </Link>
        </div>
      </div>
    </section>
  )
}
