import { useEffect, useRef } from 'react'
import './ScanReport.css'

const RATING = {
  no_concern: {
    label: 'No Concern',
    icon: '✓',
    cls: 'rating--ok',
    barWidth: '0%',
  },
  minor: {
    label: 'Minor',
    icon: '●',
    cls: 'rating--minor',
    barWidth: '25%',
  },
  moderate: {
    label: 'Moderate',
    icon: '◆',
    cls: 'rating--moderate',
    barWidth: '50%',
  },
  serious: {
    label: 'Serious',
    icon: '▲',
    cls: 'rating--serious',
    barWidth: '75%',
  },
  critical: {
    label: 'Critical',
    icon: '✕',
    cls: 'rating--critical',
    barWidth: '100%',
  },
}

const OVERALL = {
  low: {
    label: 'Low Risk',
    icon: '🛡️',
    cls: 'overall--low',
    desc: 'All areas rated No Concern or Minor. The skill appears safe for its stated purpose.',
  },
  moderate: {
    label: 'Moderate Risk',
    icon: '⚠️',
    cls: 'overall--moderate',
    desc: 'Some areas have moderate findings. Worth reviewing the specific concerns before installing.',
  },
  high: {
    label: 'High Risk',
    icon: '⚡',
    cls: 'overall--high',
    desc: 'One or more areas are rated Serious. Read the details carefully before installing.',
  },
  critical: {
    label: 'Very High Risk',
    icon: '🚨',
    cls: 'overall--critical',
    desc: 'One or more Critical findings were detected. We strongly recommend against installing unless these are resolved.',
  },
}

function RatingBadge({ rating }) {
  const cfg = RATING[rating] || RATING.no_concern
  return (
    <span className={`r-badge ${cfg.cls}`}>
      <span className="r-badge__icon">{cfg.icon}</span>
      {cfg.label}
    </span>
  )
}

function RatingBar({ rating }) {
  const cfg = RATING[rating] || RATING.no_concern
  return (
    <div className="r-bar">
      <div className={`r-bar__fill ${cfg.cls}`} style={{ width: cfg.barWidth }} />
    </div>
  )
}

function AreaCard({ area }) {
  const cfg = RATING[area.rating] || RATING.no_concern
  return (
    <div className={`area-card area-card--${cfg.cls.replace('rating--', '')}`}>
      <div className="area-card__head">
        <div className="area-card__meta">
          <span className="area-card__id">#{area.id < 10 ? '0' + area.id : area.id}</span>
          <span className={`area-card__priority ${area.priority === 'high' ? 'area-card__priority--high' : 'area-card__priority--std'}`}>
            {area.priority === 'high' ? 'High Priority' : 'Standard'}
          </span>
        </div>
        <RatingBadge rating={area.rating} />
      </div>

      <h3 className="area-card__name">{area.name}</h3>
      <RatingBar rating={area.rating} />

      <p className="area-card__short">{area.in_short}</p>

      {area.evidence && (
        <div className="area-card__evidence">
          <span className="area-card__evidence-label">Evidence</span>
          <p className="area-card__evidence-text">{area.evidence}</p>
        </div>
      )}
    </div>
  )
}

export default function ScanReport({ report, onNewScan }) {
  const topRef = useRef(null)

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [report])

  const overall = OVERALL[report.overall_risk] || OVERALL.moderate
  const highAreas = (report.areas || []).filter((a) => a.priority === 'high')
  const stdAreas = (report.areas || []).filter((a) => a.priority === 'standard')

  return (
    <div className="sr" ref={topRef}>
      {/* Overall risk banner */}
      <div className={`sr__banner ${overall.cls}`}>
        <div className="sr__banner-left">
          <span className="sr__banner-icon">{overall.icon}</span>
          <div>
            <p className="sr__banner-label">Overall Assessment</p>
            <h2 className="sr__banner-risk">{overall.label}</h2>
          </div>
        </div>
        <div className="sr__banner-meta">
          {report.skill_name && report.skill_name !== 'unknown' && (
            <div className="sr__meta-item">
              <span className="sr__meta-key">Skill</span>
              <span className="sr__meta-val">{report.skill_name}</span>
            </div>
          )}
          {report.author && report.author !== 'unknown' && (
            <div className="sr__meta-item">
              <span className="sr__meta-key">Author</span>
              <span className="sr__meta-val">{report.author}</span>
            </div>
          )}
          {report.version && report.version !== 'unknown' && (
            <div className="sr__meta-item">
              <span className="sr__meta-key">Version</span>
              <span className="sr__meta-val">{report.version}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary + actions */}
      <div className="sr__summary">
        <div className="sr__summary-section">
          <h3 className="sr__summary-title">What This Means</h3>
          <p className="sr__summary-text">{report.overall_summary}</p>
        </div>
        {report.what_you_can_do && (
          <div className="sr__summary-section">
            <h3 className="sr__summary-title">What You Can Do</h3>
            <p className="sr__summary-text">{report.what_you_can_do}</p>
          </div>
        )}
      </div>

      {/* Radar-style overview */}
      <div className="sr__overview">
        {(report.areas || []).map((area) => {
          const cfg = RATING[area.rating] || RATING.no_concern
          return (
            <div key={area.id} className={`sr__overview-item sr__overview-item--${cfg.cls.replace('rating--', '')}`}>
              <span className="sr__overview-icon">{cfg.icon}</span>
              <span className="sr__overview-name">{area.name.split(' ')[0]}</span>
            </div>
          )
        })}
      </div>

      {/* High priority areas */}
      {highAreas.length > 0 && (
        <div className="sr__section">
          <div className="sr__section-head">
            <span className="sr__section-badge sr__section-badge--high">High Priority</span>
            <h3 className="sr__section-title">Areas Most Likely to Cause Real Damage</h3>
          </div>
          <div className="sr__grid sr__grid--high">
            {highAreas.map((area) => (
              <AreaCard key={area.id} area={area} />
            ))}
          </div>
        </div>
      )}

      {/* Standard priority areas */}
      {stdAreas.length > 0 && (
        <div className="sr__section">
          <div className="sr__section-head">
            <span className="sr__section-badge sr__section-badge--std">Standard Priority</span>
            <h3 className="sr__section-title">Additional Risk Areas</h3>
          </div>
          <div className="sr__grid sr__grid--std">
            {stdAreas.map((area) => (
              <AreaCard key={area.id} area={area} />
            ))}
          </div>
        </div>
      )}

      {/* Cross-area connections */}
      {report.cross_area_connections && (
        <div className="sr__connections">
          <div className="sr__connections-head">
            <span className="sr__connections-icon">🔗</span>
            <h3 className="sr__connections-title">Cross-Area Connections</h3>
          </div>
          <p className="sr__connections-text">{report.cross_area_connections}</p>
        </div>
      )}

      {/* Footer */}
      <div className="sr__footer">
        <p className="sr__disclaimer">
          This assessment reflects our best analysis of the provided artifacts.
          The final installation decision is always yours.
        </p>
        <button className="sr__new-scan" onClick={onNewScan}>
          ↩ Scan Another Skill
        </button>
      </div>
    </div>
  )
}
