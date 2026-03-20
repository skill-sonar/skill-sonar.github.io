import './Hero.css'

export default function GuardHero() {
  return (
    <section className="gp-hero">
      <div className="container">
        <div className="gp-hero__label">
          <span className="tag tag--purple">Run-Time Guard Skill</span>
        </div>
        <h1 className="gp-hero__title">
          Run-Time Guard Skill<br />for Autonomous Agents
        </h1>
        <p className="gp-hero__subtitle">
          A lightweight guard pipeline that protects agents during execution —
          not just before installation.
        </p>
        <p className="gp-hero__desc">
          It helps detect unsafe inputs, plan drift, risky tool calls, and
          destructive actions before they happen.
        </p>
        <div className="gp-hero__actions">
          {/* <button className="btn btn--primary">View Demo</button> */}
          <a href="#quickstart" className="btn btn--ghost">Quickstart</a>
        </div>
      </div>
    </section>
  )
}
