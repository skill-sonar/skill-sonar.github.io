import { useState, useEffect } from 'react'
import './ScanProgress.css'

const STEPS = [
  { label: 'Uploading skill artifacts…', icon: '📤' },
  { label: 'Reading all files…', icon: '📂' },
  { label: 'Analyzing semantic integrity and structure…', icon: '🔍' },
  { label: 'Checking credentials and exfiltration patterns…', icon: '🔑' },
  { label: 'Evaluating injection resistance and permissions…', icon: '🛡' },
  { label: 'Assessing destructive potential and persistence…', icon: '⚠️' },
  { label: 'Generating risk report…', icon: '📋' },
]

export default function ScanProgress() {
  const [stepIdx, setStepIdx] = useState(0)
  const [progress, setProgress] = useState(4)

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setStepIdx((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev))
    }, 3200)

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const target = Math.min(((stepIdx + 1) / STEPS.length) * 88, 88)
        if (prev >= target) return prev
        return Math.min(prev + 0.8, 88)
      })
    }, 100)

    return () => {
      clearInterval(stepTimer)
      clearInterval(progressTimer)
    }
  }, [stepIdx])

  const current = STEPS[stepIdx]

  return (
    <div className="sp">
      <div className="sp__header">
        <span className="sp__pulse" />
        <span className="sp__title">Scanning in progress</span>
      </div>

      <div className="sp__steps">
        {STEPS.map((s, i) => (
          <div
            key={i}
            className={
              'sp__step' +
              (i < stepIdx ? ' sp__step--done' : '') +
              (i === stepIdx ? ' sp__step--active' : '')
            }
          >
            <span className="sp__step-icon">
              {i < stepIdx ? '✓' : s.icon}
            </span>
            <span className="sp__step-label">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="sp__bar-wrap">
        <div className="sp__bar">
          <div className="sp__bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="sp__pct">{Math.round(progress)}%</span>
      </div>

      <p className="sp__note">
        This may take 15–40 seconds depending on the model and file size.
      </p>
    </div>
  )
}
