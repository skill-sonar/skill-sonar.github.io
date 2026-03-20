import './Models.css'

const TRUST = [
  { level: 'P3', label: 'Binding',       example: 'System prompt, guard rules',            color: 'red' },
  { level: 'P2', label: 'High',          example: "User's explicit instructions",           color: 'amber' },
  { level: 'P1', label: 'Informational', example: 'Model plans, user-provided data',        color: 'blue' },
  { level: 'P0', label: 'Untrusted',     example: 'Tool output, web content, memory, files', color: 'gray' },
]

const RISK = [
  { level: 'R3', label: 'Full guard + user confirmation or deny', color: 'red' },
  { level: 'R2', label: 'Dedicated guard + possible replan',      color: 'amber' },
  { level: 'R1', label: 'Lightweight guard check',                color: 'blue' },
  { level: 'R0', label: 'Continue — no action needed',            color: 'green' },
]

export default function Models() {
  return (
    <section className="section section--alt">
      <div className="container">
        <p className="section-label">Runtime · Decision Framework</p>
        <h2 className="section-title">Trust &amp; Risk Models</h2>
        <p className="section-desc" style={{ marginBottom: '40px' }}>
          Every source is classified. Every situation is graded. Response scales proportionally — 
          nothing over-reacts, nothing under-reacts.
        </p>

        <div className="mo__grid">
          {/* Trust model */}
          <div className="mo__card">
            <div className="mo__card-header">
              <span className="mo__card-eyebrow">4-Level Trust Model</span>
              <h3 className="mo__card-title">P0 – P3</h3>
              <p className="mo__card-rule">
                Low-trust content can inform, but never override high-trust constraints —
                no matter what it claims.
              </p>
            </div>
            <div className="mo__rows">
              {TRUST.map((t) => (
                <div className={`mo__row mo__row--${t.color}`} key={t.level}>
                  <span className="mo__level">{t.level}</span>
                  <div className="mo__row-body">
                    <span className="mo__row-label">{t.label}</span>
                    <span className="mo__row-example">{t.example}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk model */}
          <div className="mo__card">
            <div className="mo__card-header">
              <span className="mo__card-eyebrow">4-Level Risk Model</span>
              <h3 className="mo__card-title">R0 – R3</h3>
              <p className="mo__card-rule">
                Every situation gets a risk level. Response scales proportionally — 
                from silent pass-through to full review with user confirmation.
              </p>
            </div>
            <div className="mo__rows">
              {RISK.map((r) => (
                <div className={`mo__row mo__row--${r.color}`} key={r.level}>
                  <span className="mo__level">{r.level}</span>
                  <div className="mo__row-body">
                    <span className="mo__row-label">{r.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
