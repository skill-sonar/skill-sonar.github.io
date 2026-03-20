import './Features.css'

const LIGHTWEIGHT = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
        <path d="M14 2v6h6M9 13h6M9 17h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Document-Level Routing',
    desc: 'No config files, no install parameters, no schema validation. SKILL.md reads context, picks the right guard path, and directs the agent — all in plain markdown.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: '2-Phase Preflight',
    desc: 'Phase 1 triages all nine areas in ~160 lines. Clean skills stop here. Phase 2 loads deep analysis only for flagged areas (~40–55 lines each). Token cost scales with actual risk.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7"/>
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      </svg>
    ),
    title: 'On-Demand Loading',
    desc: 'Stage guards, checklists, and area files are only read when triage routes to them. Nothing is preloaded. A clean skill costs one quick scan.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Zero Overhead',
    desc: 'A clean skill costs one quick scan. A complex task loads only the guards it triggers. Nothing runs speculatively, nothing pre-loads.',
  },
]

const ZERO_INSTALL = [
  { prop: 'Install required',     val: 'None — it\'s a skill' },
  { prop: 'Cloud dependency',     val: 'None — runs locally' },
  { prop: 'Configuration files',  val: 'None — document-level routing' },
  { prop: 'Runtime dependencies', val: 'None — pure reasoning' },
  { prop: 'Enforcement model',    val: 'Policy-level (reasoning + prompting)' },
]

export default function Features() {
  return (
    <>
      {/* Lightweight by design */}
      <section className="section">
        <div className="container">
          <p className="section-label">Architecture</p>
          <h2 className="section-title">Lightweight by Design</h2>
          <p className="section-desc" style={{ marginBottom: '40px' }}>
            Token cost scales with actual risk — nothing runs when nothing is wrong.
          </p>
          <div className="ft__grid">
            {LIGHTWEIGHT.map((f) => (
              <div className="ft__card" key={f.title}>
                <div className="ft__card-icon">{f.icon}</div>
                <h3 className="ft__card-title">{f.title}</h3>
                <p className="ft__card-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modular + No Install side by side */}
      <section className="section section--alt">
        <div className="container">
          <div className="ft__bottom-grid">

            {/* Modular */}
            <div className="ft__module-card">
              <p className="section-label" style={{ marginBottom: '10px' }}>Extensibility</p>
              <h2 className="section-title" style={{ fontSize: '20px', marginBottom: '12px' }}>Modular &amp; Extensible</h2>
              <p className="ft__module-desc">Every component is an independent file:</p>
              <ul className="ft__module-list">
                <li>Update credential patterns without touching injection checks</li>
                <li>Add a new risk area without modifying the audit flow</li>
                <li>Improve one stage guard without affecting others</li>
                <li>Contributors can focus on their area of expertise</li>
              </ul>
            </div>

            {/* No install */}
            <div className="ft__zero-card">
              <p className="section-label" style={{ marginBottom: '10px' }}>Zero Footprint</p>
              <h2 className="section-title" style={{ fontSize: '20px', marginBottom: '20px' }}>No Install. No Cloud. No Dependencies.</h2>
              <div className="ft__zero-table">
                {ZERO_INSTALL.map((r) => (
                  <div className="ft__zero-row" key={r.prop}>
                    <span className="ft__zero-prop">{r.prop}</span>
                    <span className="ft__zero-val">
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" className="ft__zero-check">
                        <circle cx="6" cy="6" r="5.5" fill="#dcfce7" stroke="#16a34a" strokeWidth="1"/>
                        <path d="M3.5 6l2 2 3-3" stroke="#16a34a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {r.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
