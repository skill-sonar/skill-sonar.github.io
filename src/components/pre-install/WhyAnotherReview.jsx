import './WhyAnotherReview.css'

export default function WhyAnotherReview() {
  return (
    <section className="section">
      <div className="container">
        <p className="section-label">Context</p>
        <h2 className="section-title">Why Another Pre-Install Review Skill?</h2>
        <p className="war__intro">
          Skill Vetter is practical and fast, but it is optimized for quick triage.
          Our SKILL is designed for cases where a more thorough review is needed —
          especially when a skill has broad access, handles sensitive data, or may
          affect system behavior.
        </p>
        <div className="war__contrast">
          <div className="war__card war__card--left">
            <div className="war__card-header">
              <span className="tag tag--blue">Skill Vetter</span>
            </div>
            <p className="war__card-role">Fast first-line filter</p>
            <ul className="war__card-points">
              <li>Quick triage pass</li>
              <li>Checklist-style review</li>
              <li>Low overhead, wide coverage</li>
            </ul>
          </div>
          <div className="war__divider">
            <span className="war__vs">vs</span>
          </div>
          <div className="war__card war__card--right">
            <div className="war__card-header">
              <span className="tag tag--blue">Our SKILL</span>
            </div>
            <p className="war__card-role">Deeper structured review</p>
            <ul className="war__card-points">
              <li>Thorough per-area analysis</li>
              <li>Semantic reasoning</li>
              <li>Higher-risk skill focus</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
