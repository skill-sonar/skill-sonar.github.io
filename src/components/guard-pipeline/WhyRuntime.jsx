import './WhyRuntime.css'

const runtimePhases = [
  { icon: '📥', label: 'Reading external content' },
  { icon: '🧠', label: 'Updating memory' },
  { icon: '📋', label: 'Making plans' },
  { icon: '🔧', label: 'Calling tools' },
  { icon: '⚡', label: 'Taking high-impact actions' },
]

export default function WhyRuntime() {
  return (
    <section className="section section--alt">
      <div className="container">
        <p className="section-label">Motivation</p>
        <h2 className="section-title">Why Run-Time Guarding?</h2>
        <p className="wr__intro">
          Pre-install vetting is useful, but many failures only appear while
          the agent is actively running.
        </p>
        <p className="wr__sub">
          The Run-Time Guard Skill adds protection during execution, when the agent is:
        </p>
        <div className="wr__phases">
          {runtimePhases.map((p, i) => (
            <div className="wr__phase" key={i}>
              <span className="wr__phase-icon">{p.icon}</span>
              <span className="wr__phase-label">{p.label}</span>
            </div>
          ))}
        </div>
        <div className="wr__contrast">
          <div className="wr__contrast-item">
            <span className="wr__contrast-badge wr__contrast-badge--muted">Static vetting</span>
            <p>Checks what a skill <em>is</em></p>
          </div>
          <span className="wr__contrast-arrow">→</span>
          <div className="wr__contrast-item">
            <span className="wr__contrast-badge wr__contrast-badge--purple">Run-time guarding</span>
            <p>Checks what the agent is <em>doing</em></p>
          </div>
        </div>
      </div>
    </section>
  )
}
