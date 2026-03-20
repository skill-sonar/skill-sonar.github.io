import './SimulatedDemo.css'

function UserBubble({ text }) {
  return (
    <div className="demo__msg demo__msg--user">
      <span className="demo__avatar demo__avatar--user">U</span>
      <div className="demo__bubble demo__bubble--user">{text}</div>
    </div>
  )
}

function AssistantBubble({ text }) {
  return (
    <div className="demo__msg demo__msg--assistant">
      <span className="demo__avatar demo__avatar--assistant">A</span>
      <div className="demo__bubble demo__bubble--assistant">{text}</div>
    </div>
  )
}

function ToolMsg({ text }) {
  return (
    <div className="demo__msg demo__msg--tool">
      <span className="demo__avatar demo__avatar--tool">⚙</span>
      <div className="demo__bubble demo__bubble--tool">
        <span className="demo__tool-label">Tool</span>
        {text}
      </div>
    </div>
  )
}

function GuardCard() {
  return (
    <div className="demo__msg demo__msg--guard">
      <span className="demo__avatar demo__avatar--guard">🛡</span>
      <div className="demo__guard-card">
        <div className="demo__guard-header">
          <span className="demo__guard-title">Guard Pipeline Check</span>
        </div>
        <div className="demo__guard-body">
          <div className="demo__guard-row">
            <span className="demo__guard-key">Risk Level</span>
            <span className="demo__guard-val demo__guard-val--risk">R3</span>
          </div>
          <div className="demo__guard-row">
            <span className="demo__guard-key">Triggered Guard</span>
            <span className="demo__guard-val">Execution Guard</span>
          </div>
          <div className="demo__guard-row">
            <span className="demo__guard-key">Recommended Action</span>
            <span className="demo__guard-val demo__guard-val--action">
              require_user_confirmation
            </span>
          </div>
        </div>
        <div className="demo__guard-files">
          <p className="demo__guard-files-label">Files matched for deletion:</p>
          <ul>
            <li><code>test1.txt</code></li>
            <li><code>test211.txt</code></li>
          </ul>
        </div>
        <div className="demo__guard-confirm">
          Confirm deletion by typing <code>/approve</code>.
        </div>
      </div>
    </div>
  )
}

export default function SimulatedDemo() {
  return (
    <section className="section section--alt" id="demo">
      <div className="container--wide">
        <p className="section-label">Interactive Demo</p>
        <h2 className="section-title">See the Guard Pipeline in Action</h2>
        <p className="sd__intro">
          A simple side-by-side simulation of the same task, with and without run-time guarding.
        </p>

        <div className="sd__comparison">
          {/* Left: Without Guard */}
          <div className="sd__panel">
            <div className="sd__panel-head">
              <span className="sd__panel-title">Without Guard Skill</span>
              <span className="tag tag--red">Unsafe</span>
            </div>
            <p className="sd__caption">
              The agent executes a destructive action immediately, without preview or confirmation.
            </p>
            <div className="sd__chat">
              <UserBubble text='Delete all files containing "1" under the test folder in the workspace.' />
              <AssistantBubble text="Listing files in /workspace/test/ …" />
              <ToolMsg text="Deleting matched files …" />
              <AssistantBubble text="Done. Deleted test1.txt and test211.txt." />
            </div>
          </div>

          {/* Right: With Guard */}
          <div className="sd__panel sd__panel--guarded">
            <div className="sd__panel-head">
              <span className="sd__panel-title">With Guard Skill</span>
              <span className="tag tag--green">Guarded</span>
            </div>
            <p className="sd__caption">
              The Guard Skill detects a high-risk action, previews affected files, and requires
              explicit user confirmation before execution.
            </p>
            <div className="sd__chat">
              <UserBubble text='Delete all files containing "1" under the test folder in the workspace.' />
              <AssistantBubble text="Listing files in /workspace/test/ …" />
              <GuardCard />
              <AssistantBubble text="Waiting for confirmation before proceeding." />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
