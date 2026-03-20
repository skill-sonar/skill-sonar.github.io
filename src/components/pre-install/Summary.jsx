import './Summary.css'

export default function PreInstallSummary() {
  return (
    <section className="section">
      <div className="container">
        <p className="section-label">Summary</p>
        <h2 className="section-title">The Bottom Line</h2>
        <p className="pi-sum__text">
          Skill Vetter is a strong first-line filter for quick triage.
          Our SKILL is better suited for deeper pre-install review, especially when
          the consequences of a missed issue would be significant.
        </p>
        <div className="pi-sum__tradeoff">
          <div className="pi-sum__item">
            <span className="pi-sum__label">Skill Vetter</span>
            <ul className="pi-sum__points">
              <li>Faster</li>
              <li>Simpler</li>
              <li>Lower overhead</li>
            </ul>
          </div>
          <div className="pi-sum__sep" />
          <div className="pi-sum__item pi-sum__item--ours">
            <span className="pi-sum__label pi-sum__label--ours">Our SKILL</span>
            <ul className="pi-sum__points">
              <li>Slower, but deeper</li>
              <li>More detailed findings</li>
              <li>Better for high-stakes review</li>
            </ul>
          </div>
        </div>
        <p className="pi-sum__note">
          This trade-off is intentional. Neither approach is universally better —
          the right choice depends on the risk profile of the skill being reviewed.
        </p>
      </div>
    </section>
  )
}
