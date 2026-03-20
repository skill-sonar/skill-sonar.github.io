import './Quickstart.css'

const steps = [
  { num: 1, text: 'Add the Guard Skill to your skill set' },
  { num: 2, text: 'Include the references/ folder' },
  { num: 3, text: 'Enable it for agent tasks' },
  { num: 4, text: 'Let it guard key checkpoints during execution' },
]

export default function Quickstart() {
  return (
    <section className="section" id="quickstart">
      <div className="container">
        <p className="section-label">Getting Started</p>
        <h2 className="section-title">Quickstart</h2>
        <p className="qs__intro">Use it like a normal skill.</p>
        <ol className="qs__steps">
          {steps.map((s) => (
            <li className="qs__step" key={s.num}>
              <span className="qs__num">{s.num}</span>
              <span className="qs__text">{s.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
