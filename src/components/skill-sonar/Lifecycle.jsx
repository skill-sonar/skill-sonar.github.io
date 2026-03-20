import './Lifecycle.css'

const RISK_AREAS = [
  { n: '01', name: 'Semantic & Structural Integrity',   desc: 'Hidden content, description-behavior mismatch, encoding tricks, invisible Unicode' },
  { n: '02', name: 'Supply Chain & Source Verification', desc: 'Unverifiable sources, dependency poisoning, runtime loading from changeable URLs' },
  { n: '03', name: 'Secret & Credential Exposure',       desc: 'Credential access, hardcoded secrets, sensitive file references' },
  { n: '04', name: 'Data Privacy & Exfiltration',        desc: 'Covert data transmission, DNS exfiltration, steganography' },
  { n: '05', name: 'Injection & Influence Resistance',   desc: 'Prompt injection, MCP poisoning, memory corruption, cross-tool chains' },
  { n: '06', name: 'Permission & Access Scope',          desc: 'Privilege escalation, disproportionate access, system modifications' },
  { n: '07', name: 'Destructive Potential',              desc: 'Unconditional deletes, force flags, disguised destruction' },
  { n: '08', name: 'Resource Discipline',                desc: 'Unbounded loops, runaway API costs, self-triggering watchers' },
  { n: '09', name: 'Persistence',                        desc: 'Hidden hooks, startup tasks, auto-restore mechanisms' },
]

const STAGE_GUARDS = [
  { stage: 'Input',     color: 'blue',   desc: 'Block injected instructions from low-trust sources' },
  { stage: 'Memory',    color: 'violet', desc: 'Prevent poisoning, contradiction, covert policy injection' },
  { stage: 'Plan',      color: 'violet', desc: 'Catch goal drift, scope creep, unsafe plans before execution' },
  { stage: 'Tool',      color: 'amber',  desc: 'Validate tool selection and arguments for necessity and minimality' },
  { stage: 'Execution', color: 'red',    desc: 'Final gate before anything irreversible, external, or destructive' },
  { stage: 'Output',    color: 'blue',   desc: 'Stop credential leaks, instruction relay, trust misrepresentation' },
]

export default function Lifecycle() {
  return (
    <>
      {/* ── 2-Stage overview ── */}
      <section className="section">
        <div className="container">
          <p className="section-label">Lifecycle Protection</p>
          <h2 className="section-title">2-Stage Coverage</h2>
          <p className="section-desc" style={{ marginBottom: '40px' }}>
            Most guard tools protect one moment. Skill Sonar protects two.
            Use one, use both, or let the guard auto-detect which stage you're in.
          </p>

          <div className="lc__stages">
            <div className="lc__stage lc__stage--preflight">
              <div className="lc__stage-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="lc__stage-tag">Stage 1</span>
              <h3 className="lc__stage-name">Preflight</h3>
              <p className="lc__stage-desc">Audit any skill before you install it. Catch threats before they run.</p>
              <div className="lc__stage-detail">9 independent risk areas · Severity-weighted scoring · Cross-area compound detection</div>
            </div>

            <div className="lc__stage-arrow">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>or both</span>
            </div>

            <div className="lc__stage lc__stage--runtime">
              <div className="lc__stage-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="lc__stage-tag">Stage 2</span>
              <h3 className="lc__stage-name">Runtime</h3>
              <p className="lc__stage-desc">Monitor every action while your agent works. Catch threats as they happen.</p>
              <div className="lc__stage-detail">6 lifecycle checkpoints · P0–P3 trust model · R0–R3 risk response</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9 Risk areas ── */}
      <section className="section section--alt">
        <div className="container">
          <p className="section-label">Pre-Install · Preflight</p>
          <h2 className="section-title">9 Pre-Install Risk Areas</h2>
          <p className="section-desc" style={{ marginBottom: '36px' }}>
            Every candidate skill is analyzed across nine independent security dimensions.
          </p>
          <div className="lc__risk-grid">
            {RISK_AREAS.map((a) => (
              <div className="lc__risk-card" key={a.n}>
                <span className="lc__risk-num">{a.n}</span>
                <h3 className="lc__risk-name">{a.name}</h3>
                <p className="lc__risk-desc">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6 Stage guards ── */}
      <section className="section">
        <div className="container">
          <p className="section-label">Runtime · Stage Guards</p>
          <h2 className="section-title">6 Runtime Stage Guards</h2>
          <p className="section-desc" style={{ marginBottom: '36px' }}>
            Continuous checkpoints across the full task lifecycle.
          </p>
          <div className="lc__guards">
            {STAGE_GUARDS.map((g, i) => (
              <div className={`lc__guard lc__guard--${g.color}`} key={g.stage}>
                <div className="lc__guard-index">{String(i + 1).padStart(2, '0')}</div>
                <div className="lc__guard-body">
                  <span className="lc__guard-stage">{g.stage}</span>
                  <p className="lc__guard-desc">{g.desc}</p>
                </div>
                {i < STAGE_GUARDS.length - 1 && (
                  <div className="lc__guard-arrow">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
