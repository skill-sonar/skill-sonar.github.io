import { useState, useRef } from 'react'
import UploadForm from '../components/scanner/UploadForm'
import ScanProgress from '../components/scanner/ScanProgress'
import ScanReport from '../components/scanner/ScanReport'
import './Scanner.css'

export default function ScannerPage() {
  const [status, setStatus] = useState('idle') // idle | scanning | done | error
  const [report, setReport] = useState(null)
  const [error, setError] = useState(null)
  const resultRef = useRef(null)

  const handleScan = async ({ files, apiKey, model, provider, baseUrl }) => {
    setStatus('scanning')
    setError(null)
    setReport(null)

    const formData = new FormData()
    files.forEach((file) => formData.append('files', file))
    formData.append('paths', JSON.stringify(files.map((f) => f.webkitRelativePath || f.name)))
    formData.append('api_key', apiKey)
    formData.append('model', model)
    formData.append('provider', provider || 'openai')
    if (baseUrl) formData.append('base_url', baseUrl)

    try {
      const baseURL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '')
      const res = await fetch(`${baseURL}/api/scan`, { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Scan failed.')
      setReport(data)
      setStatus('done')
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }

  const handleNewScan = () => {
    setStatus('idle')
    setReport(null)
    setError(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="scanner-page">
      <section className="scanner-hero">
        <div className="container">
          <div className="scanner-hero__tag-row">
            <span className="tag tag--blue">Security Scanner</span>
            <span className="scanner-hero__powered">Powered by Pre-Install Review Methodology</span>
          </div>
          <h1 className="scanner-hero__title">Scan a Skill Before Installing</h1>
          <p className="scanner-hero__subtitle">
            Upload a skill file or folder and get a full nine-area security assessment
            across semantic integrity, credential exposure, injection resistance, and more.
          </p>
          <div className="scanner-hero__features">
            <span className="scanner-hero__feat">9 risk areas</span>
            <span className="scanner-hero__feat-sep">·</span>
            <span className="scanner-hero__feat">Plain-language findings</span>
            <span className="scanner-hero__feat-sep">·</span>
            <span className="scanner-hero__feat">Cross-area analysis</span>
            <span className="scanner-hero__feat-sep">·</span>
            <span className="scanner-hero__feat">Your API key, used once and never stored</span>
          </div>
        </div>
      </section>

      <section className="scanner-body">
        <div className="container">
          {(status === 'idle' || status === 'scanning' || status === 'error') && (
            <div className="scanner-form-wrap">
              <UploadForm onScan={handleScan} disabled={status === 'scanning'} />
            </div>
          )}

          {status === 'scanning' && <ScanProgress />}

          {status === 'error' && (
            <div className="scanner-error">
              <span className="scanner-error__icon">⚠️</span>
              <div>
                <p className="scanner-error__msg">{error}</p>
                <button className="scanner-error__retry" onClick={() => setStatus('idle')}>
                  Try Again
                </button>
              </div>
            </div>
          )}

          {status === 'done' && report && (
            <ScanReport report={report} onNewScan={handleNewScan} />
          )}
        </div>
      </section>
    </main>
  )
}
