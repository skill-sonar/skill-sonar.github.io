import './KeyAdvantages.css'

const advantages = [
  {
    num: '01',
    title: 'Finer-grained severity analysis',
    desc: 'Evaluates risk per area with explicit severity and justification, rather than relying mainly on red-flag style judgment.',
  },
  {
    num: '02',
    title: 'Semantic and logical consistency analysis',
    desc: 'Checks whether the skill\'s claims, structure, and executable behavior actually align — detecting contradictions such as "read-only" claims paired with write-capable behavior.',
  },
  {
    num: '03',
    title: 'Stronger hidden-content detection',
    desc: 'Goes beyond generic obfuscation checks by covering invisible Unicode, homoglyphs, hidden markup, encoded payloads, and suspicious file structures.',
  },
  {
    num: '04',
    title: 'Better agent-specific threat coverage',
    desc: 'Explicitly covers MCP poisoning, memory/context poisoning, system prompt extraction, argument injection, and cross-tool chain attacks.',
  },
  {
    num: '05',
    title: 'More detailed credential and exfiltration analysis',
    desc: 'Uses more specific credential patterns and broader exfiltration reasoning instead of relying only on generic secret or network checks.',
  },
  {
    num: '06',
    title: 'Stronger permission reasoning',
    desc: "Evaluates not only what access a skill requests, but whether that access is proportionate to the stated purpose and whether findings in one area should raise concern in another.",
  },
]

export default function KeyAdvantages() {
  return (
    <section className="section section--alt">
      <div className="container">
        <p className="section-label">Key Advantages</p>
        <h2 className="section-title">What Makes This SKILL Different</h2>
        <p className="section-desc" style={{ marginBottom: '44px' }}>
          Six areas where our SKILL goes meaningfully deeper than checklist-style review.
        </p>
        <div className="ka__grid">
          {advantages.map((adv) => (
            <div className="ka__card" key={adv.num}>
              <span className="ka__num">{adv.num}</span>
              <h3 className="ka__title">{adv.title}</h3>
              <p className="ka__desc">{adv.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
