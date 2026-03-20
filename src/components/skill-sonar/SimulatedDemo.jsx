import { useState, useEffect, useCallback, useRef } from 'react'
import './SimulatedDemo.css'

const CHAR_DELAY = 28
const PAUSE_MS = 2200
const CLEAR_MS = 600

function TypewriterBubble({ text, role, show, active, onComplete }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!active || !text) return
    setDisplayed('')
    setDone(false)
    let i = 0
    const timer = setInterval(() => {
      if (i >= text.length) {
        clearInterval(timer)
        setDone(true)
        onComplete?.()
        return
      }
      setDisplayed(text.slice(0, i + 1))
      i++
    }, CHAR_DELAY)
    return () => clearInterval(timer)
  }, [active, text, onComplete])

  if (!show && !done) return null

  const isUser = role === 'user'
  return (
    <div className={`ss-demo__msg ss-demo__msg--${isUser ? 'user' : 'assistant'}`}>
      <span className={`ss-demo__avatar ss-demo__avatar--${isUser ? 'user' : 'assistant'}`}>
        {isUser ? 'U' : 'A'}
      </span>
      <div className={`ss-demo__bubble ss-demo__bubble--${isUser ? 'user' : 'assistant'} ss-demo__bubble--typewriter`}>
        {done ? text : displayed}
        {active && !done && <span className="ss-demo__cursor" />}
      </div>
    </div>
  )
}

function GuardCard({ show, active, onComplete }) {
  useEffect(() => {
    if (!active || !onComplete) return
    const t = setTimeout(onComplete, 600)
    return () => clearTimeout(t)
  }, [active, onComplete])
  if (!show) return null
  return (
    <div className="ss-demo__msg ss-demo__msg--guard ss-demo__msg--reveal">
      <span className="ss-demo__avatar ss-demo__avatar--guard">🛡</span>
      <div className="ss-demo__guard-card">
        <div className="ss-demo__guard-header">
          <span className="ss-demo__guard-title">[GUARD] R3</span>
        </div>
        <div className="ss-demo__guard-body">
          <div className="ss-demo__guard-row">
            <span className="ss-demo__guard-key">step</span>
            <span className="ss-demo__guard-val">delete_files_with_copy</span>
          </div>
          <div className="ss-demo__guard-row">
            <span className="ss-demo__guard-key">trigger</span>
            <span className="ss-demo__guard-val">delete_remove_wipe_truncate</span>
          </div>
          <div className="ss-demo__guard-row">
            <span className="ss-demo__guard-key">action</span>
            <span className="ss-demo__guard-val ss-demo__guard-val--action">require_user_confirmation</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function UnsafePanel({ phase, onCycleComplete, restartKey }) {
  const [step, setStep] = useState(-1)
  const maxStep = 1
  const hasReported = useRef(false)

  useEffect(() => {
    if (phase === 'running' && restartKey > 0) {
      setStep(0)
      hasReported.current = false
    } else if (phase === 'running' && restartKey === 0) {
      const t = setTimeout(() => setStep(0), 400)
      return () => clearTimeout(t)
    }
  }, [phase, restartKey])

  const next = useCallback(() => {
    setStep((s) => {
      if (s >= maxStep) {
        if (!hasReported.current) {
          hasReported.current = true
          onCycleComplete('unsafe')
        }
        return s
      }
      return s + 1
    })
  }, [maxStep, onCycleComplete])

  return (
    <div className="ss-demo__float-panel ss-demo__float-panel--unsafe">
      <div className="ss-demo__float-head">
        <span className="ss-demo__float-title">Unsafe</span>
        <span className="tag tag--red">No Guard</span>
      </div>
      <div className="ss-demo__float-chat">
        {phase !== 'cleared' && step >= 0 && (
          <>
            <TypewriterBubble
              text='Delete files in test folder whose names contain "copy".'
              role="user"
              show={step >= 0}
              active={step === 0}
              onComplete={next}
            />
            <TypewriterBubble
              text="Deletion completed successfully."
              role="assistant"
              show={step >= 1}
              active={step === 1}
              onComplete={next}
            />
          </>
        )}
      </div>
    </div>
  )
}

function GuardedPanel({ phase, onCycleComplete, restartKey }) {
  const [step, setStep] = useState(-1)
  const maxStep = 3
  const hasReported = useRef(false)

  useEffect(() => {
    if (phase === 'running' && restartKey > 0) {
      setStep(0)
      hasReported.current = false
    } else if (phase === 'running' && restartKey === 0) {
      const t = setTimeout(() => setStep(0), 1200)
      return () => clearTimeout(t)
    }
  }, [phase, restartKey])

  const next = useCallback(() => {
    setStep((s) => {
      if (s >= maxStep) {
        if (!hasReported.current) {
          hasReported.current = true
          onCycleComplete('guarded')
        }
        return s
      }
      return s + 1
    })
  }, [maxStep, onCycleComplete])

  return (
    <div className="ss-demo__float-panel ss-demo__float-panel--guarded">
      <div className="ss-demo__float-head">
        <span className="ss-demo__float-title">Guarded</span>
        <span className="tag tag--green">Safe</span>
      </div>
      <div className="ss-demo__float-chat">
        {phase !== 'cleared' && step >= 0 && (
          <>
            <TypewriterBubble
              text='Delete files in test folder whose names contain "copy".'
              role="user"
              show={step >= 0}
              active={step === 0}
              onComplete={next}
            />
            <TypewriterBubble
              text={'Let me check matching files in workspace/test first.'}
              role="assistant"
              show={step >= 1}
              active={step === 1}
              onComplete={next}
            />
            <GuardCard show={step >= 2} active={step === 2} onComplete={next} />
            <TypewriterBubble
              text={`Confirmation: I am about to delete 2 files:

workspace/test/Product - copy.txt
workspace/test/User Request - copy.txt

Files will be permanently removed.`}
              role="assistant"
              show={step >= 3}
              active={step === 3}
              onComplete={next}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default function SimulatedDemo() {
  const [phase, setPhase] = useState('running')
  const [doneFlags, setDoneFlags] = useState({ unsafe: false, guarded: false })
  const [restartKey, setRestartKey] = useState(0)
  const timerRef = useRef(null)

  const onCycleComplete = useCallback((id) => {
    setDoneFlags((prev) => {
      const next = { ...prev, [id]: true }
      if (next.unsafe && next.guarded) {
        setPhase('paused')
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
          setPhase('cleared')
          timerRef.current = setTimeout(() => {
            setPhase('running')
            setDoneFlags({ unsafe: false, guarded: false })
            setRestartKey((k) => k + 1)
            timerRef.current = null
          }, CLEAR_MS)
        }, PAUSE_MS)
      }
      return next
    })
  }, [])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <div className="ss-demo__float-wrap">
      <UnsafePanel phase={phase} onCycleComplete={onCycleComplete} restartKey={restartKey} />
      <GuardedPanel phase={phase} onCycleComplete={onCycleComplete} restartKey={restartKey} />
    </div>
  )
}
