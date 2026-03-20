import './PipelineViz.css'

const stages = [
  { id: 'input', label: 'Input', desc: 'Validates incoming requests and external content' },
  { id: 'memory', label: 'Memory', desc: 'Guards context and memory updates' },
  { id: 'plan', label: 'Plan', desc: 'Detects plan drift and goal misalignment' },
  { id: 'tool', label: 'Tool', desc: 'Inspects tool calls before execution' },
  { id: 'execution', label: 'Execution', desc: 'Intercepts high-risk or destructive actions' },
  { id: 'output', label: 'Output', desc: 'Reviews final output before delivery' },
]

export default function PipelineViz() {
  return (
    <section className="section">
      <div className="container--wide">
        <p className="section-label">Guard Pipeline</p>
        <h2 className="section-title">Checkpoints Across the Task Lifecycle</h2>
        <p className="pv__desc">
          The Guard Skill inserts checkpoints across the task lifecycle, helping the agent
          pause, inspect risk, and choose a safer next step.
        </p>
        <div className="pv__pipeline">
          {stages.map((stage, i) => (
            <div className="pv__stage-wrap" key={stage.id}>
              <div className="pv__stage">
                <div className="pv__stage-dot" />
                <span className="pv__stage-label">{stage.label}</span>
              </div>
              <p className="pv__stage-desc">{stage.desc}</p>
              {i < stages.length - 1 && (
                <span className="pv__arrow" aria-hidden>→</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
