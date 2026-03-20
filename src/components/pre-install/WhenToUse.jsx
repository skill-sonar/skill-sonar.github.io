import './WhenToUse.css'

const vetterCases = [
  'You need a fast first-pass review',
  'You are triaging many skills quickly',
  'You want a lightweight checklist-style filter',
]

const ourCases = [
  'The skill has broad file, network, or system access',
  'The skill may touch sensitive data or credentials',
  'You need deeper semantic review',
  'You want better coverage of agent-specific threats',
  'You are reviewing a skill before serious deployment',
]

export default function WhenToUse() {
  return (
    <section className="section section--alt">
      <div className="container">
        <p className="section-label">Decision Guide</p>
        <h2 className="section-title">When to Use Which</h2>
        <p className="wtu__intro">
          The two approaches differ mainly in review depth and intended use case.
          Both have their place.
        </p>
        <div className="wtu__grid">
          <div className="wtu__card">
            <div className="wtu__card-head">
              <span className="tag tag--blue">Skill Vetter</span>
              <h3 className="wtu__card-title">Use Skill Vetter when</h3>
            </div>
            <ul className="wtu__list">
              {vetterCases.map((c, i) => (
                <li key={i} className="wtu__item wtu__item--neutral">
                  <span className="wtu__icon">→</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="wtu__card wtu__card--accent">
            <div className="wtu__card-head">
              <span className="tag tag--blue">Our SKILL</span>
              <h3 className="wtu__card-title">Use Our SKILL when</h3>
            </div>
            <ul className="wtu__list">
              {ourCases.map((c, i) => (
                <li key={i} className="wtu__item wtu__item--accent">
                  <span className="wtu__icon">→</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
