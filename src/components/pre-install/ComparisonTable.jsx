import './ComparisonTable.css'

const rows = [
  {
    capability: 'Severity granularity',
    vetter: 'Mostly red-flag based, with limited overall risk differentiation',
    ours: 'Per-area severity with justification, plus overall risk assessment',
  },
  {
    capability: 'Semantic consistency analysis',
    vetter: 'Limited; mainly checks surface-level description vs behavior',
    ours: 'Detects contradictions and logical misalignment across claims, structure, and behavior',
  },
  {
    capability: 'Hidden content detection',
    vetter: 'Basic obfuscation and suspicious content signals',
    ours: 'Covers invisible Unicode, homoglyphs, hidden markup, encoded payloads, and suspicious file structure',
  },
  {
    capability: 'Agent-specific threat coverage',
    vetter: 'Limited',
    ours: 'Explicitly covers MCP poisoning, memory/context poisoning, system prompt extraction, argument injection, and cross-tool chain attacks',
  },
  {
    capability: 'Credential / exfiltration analysis',
    vetter: 'Generic checks for secrets or external transmission',
    ours: 'Uses more specific credential patterns and broader exfiltration analysis across multiple techniques',
  },
  {
    capability: 'Permission reasoning',
    vetter: 'Checks whether scope appears minimal',
    ours: 'Evaluates whether requested access is proportionate to the stated purpose, and correlates findings across risk areas',
  },
]

export default function ComparisonTable() {
  return (
    <section className="section">
      <div className="container--wide">
        <p className="section-label">Comparison</p>
        <h2 className="section-title">At-a-Glance Comparison</h2>
        <p className="ct__intro">
          The difference is depth. Skill Vetter is optimized for fast triage,
          while our SKILL is designed for deeper pre-install review of higher-risk skills.
        </p>
        <div className="ct__table-wrap">
          <table className="ct__table">
            <thead>
              <tr>
                <th className="ct__th ct__th--capability">Capability</th>
                <th className="ct__th ct__th--vetter">
                  <span className="ct__col-label ct__col-label--vetter">Skill Vetter</span>
                </th>
                <th className="ct__th ct__th--ours">
                  <span className="ct__col-label ct__col-label--ours">Our SKILL</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr className="ct__row" key={i}>
                  <td className="ct__td ct__td--capability">{row.capability}</td>
                  <td className="ct__td ct__td--vetter">{row.vetter}</td>
                  <td className="ct__td ct__td--ours">{row.ours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="ct__note">
          Skill Vetter remains useful for quick first-pass review.
          Our SKILL is intended for cases where a deeper pre-install analysis is worth the extra effort.
        </p>
      </div>
    </section>
  )
}
