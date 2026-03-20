import { useState } from 'react'
import './InstallNow.css'

function CodeBlock({ code, id }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="in__code-block">
      <span className="in__code-prompt">$</span>
      <code className="in__code-text" id={id}>{code}</code>
      <button
        className={'in__code-copy' + (copied ? ' in__code-copy--done' : '')}
        onClick={handleCopy}
        aria-label="Copy command"
      >
        {copied ? (
          <>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Copied
          </>
        ) : (
          <>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M2 10V3a1 1 0 011-1h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Copy
          </>
        )}
      </button>
    </div>
  )
}

const INSTALL_CMD = 'clawhub install skill-sonar'

export default function InstallNow() {
  const [ctaCopied, setCtaCopied] = useState(false)

  const handleCtaCopy = () => {
    navigator.clipboard.writeText(INSTALL_CMD).then(() => {
      setCtaCopied(true)
      setTimeout(() => setCtaCopied(false), 2000)
    })
  }

  return (
    <section className="section section--alt">
      <div className="container">

        {/* ── Header ── */}
        <div className="in__header">
          <p className="section-label">Get Started</p>
          <h2 className="in__title">Install Now</h2>
          <p className="in__subtitle">
            Install Skill Sonar in minutes and load it in your next OpenClaw session.
          </p>
        </div>

        {/* ── Steps ── */}
        <div className="in__steps">

          {/* Step 1 */}
          <div className="in__step">
            <div className="in__step-marker">
              <span className="in__step-num">1</span>
              <div className="in__step-line" />
            </div>
            <div className="in__step-body">
              <h3 className="in__step-title">Prerequisites</h3>
              <p className="in__step-desc">
                Make sure <strong>Node.js</strong> is installed on your computer first.
                You can verify by running <code className="in__inline-code">node -v</code> in your terminal.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="in__step">
            <div className="in__step-marker">
              <span className="in__step-num">2</span>
              <div className="in__step-line" />
            </div>
            <div className="in__step-body">
              <h3 className="in__step-title">Install ClawHub CLI</h3>
              <p className="in__step-desc">
                Install the ClawHub command-line tool globally. This gives you access to the{' '}
                <code className="in__inline-code">clawhub</code> command from anywhere in your terminal.
              </p>
              <CodeBlock code="npm i -g clawhub" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="in__step">
            <div className="in__step-marker">
              <span className="in__step-num">3</span>
              <div className="in__step-line" />
            </div>
            <div className="in__step-body">
              <h3 className="in__step-title">Install the Skill</h3>
              <p className="in__step-desc">Run the install command inside your OpenClaw workspace.</p>
              <CodeBlock code={INSTALL_CMD} />
              <div className="in__alt-install">
                <span className="in__alt-label">Prefer not to install the CLI globally?</span>
                <CodeBlock code="npx clawhub@latest install skill-sonar" />
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="in__step in__step--last">
            <div className="in__step-marker">
              <span className="in__step-num">4</span>
            </div>
            <div className="in__step-body">
              <h3 className="in__step-title">Start a New Session</h3>
              <p className="in__step-desc">
                After installation, start a new OpenClaw session so the skill can be loaded.
                Skills are picked up automatically at startup — no further configuration needed.
              </p>
            </div>
          </div>

        </div>

        {/* ── Info grid ── */}
        {/* <div className="in__info-grid">
          <div className="in__info-card">
            <h4 className="in__info-title">
              <svg className="in__info-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 7v4M8 5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Good to Know
            </h4>
            <ul className="in__info-list">
              <li>
                ClawHub's general install format is{' '}
                <code className="in__inline-code">clawhub install &lt;skill-slug&gt;</code>
              </li>
              <li>Skill Sonar is currently an instruction-only skill</li>
              <li>
                It includes <code className="in__inline-code">SKILL.md</code> only — no extra code files,
                environment variables, or install scripts
              </li>
            </ul>
          </div>

          <div className="in__info-card in__info-card--subtle">
            <h4 className="in__info-title">
              <svg className="in__info-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 12V5a1 1 0 011-1h10a1 1 0 011 1v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M1 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M6 11V8h4v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Where It Gets Installed
            </h4>
            <p className="in__info-text">
              In OpenClaw, skills are typically installed into the workspace{' '}
              <code className="in__inline-code">skills/</code> directory. If your OpenClaw workspace
              is configured, the skill will be picked up automatically in the next session —
              no manual path setup required.
            </p>
          </div>
        </div> */}

        {/* ── CTA ── */}
        <div className="in__cta">
          <a
            className="in__cta-secondary"
            href="https://clawhub.ai/yxf203/skill-sonar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ClawHubLogo />
            View on ClawHub
          </a>
        </div>

      </div>
    </section>
  )
}

function ClawHubLogo() {
  return (
    <svg className="in__clawhub-logo" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3C9 3 7 5.5 7 8c0 1.5.6 2.8 1.5 3.7L6 20h12l-2.5-8.3C16.4 10.8 17 9.5 17 8c0-2.5-2-5-5-5z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
      <path d="M9.5 7.5C9 6.5 8 6 7 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M14.5 7.5C15 6.5 16 6 17 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 7v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}
