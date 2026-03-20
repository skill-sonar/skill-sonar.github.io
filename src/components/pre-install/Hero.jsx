import { Link } from 'react-router-dom'
import './Hero.css'

export default function PreInstallHero() {
  return (
    <section className="pi-hero">
      <div className="container">
        <div className="pi-hero__label">
          <span className="tag tag--blue">Pre-Install Security Review</span>
        </div>
        <h1 className="pi-hero__title">
          Deep Pre-Install Security Review<br />for Agent Skills
        </h1>
        <p className="pi-hero__subtitle">
          A structured review framework for analyzing higher-risk skills before installation.
        </p>
        <p className="pi-hero__desc">
          Compared with checklist-style vetting, our SKILL provides deeper severity grading,
          stronger semantic analysis, and broader coverage of agent-specific attack patterns.
        </p>
        <div className="pi-hero__badges">
          <span className="pi-hero__badge">
            <span className="pi-hero__badge-dot pi-hero__badge-dot--blue" />
            Deeper severity analysis
          </span>
          <span className="pi-hero__badge">
            <span className="pi-hero__badge-dot pi-hero__badge-dot--blue" />
            Semantic consistency checks
          </span>
          <span className="pi-hero__badge">
            <span className="pi-hero__badge-dot pi-hero__badge-dot--blue" />
            Agent-specific threat coverage
          </span>
        </div>
        <div className="pi-hero__cta">
          <Link to="/scanner" className="pi-hero__try-btn">
            Try it now — scan a skill →
          </Link>
          <span className="pi-hero__cta-note">Requires your own OpenAI API key</span>
        </div>
      </div>
    </section>
  )
}
