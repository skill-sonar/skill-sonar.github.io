import { useState, useRef } from 'react'
import './UploadForm.css'

const PROVIDERS = [
  { value: 'openai',     label: 'OpenAI',       defaultBase: 'https://api.openai.com/v1' },
  { value: 'gemini',     label: 'Google Gemini', defaultBase: 'https://generativelanguage.googleapis.com/v1beta/openai' },
  { value: 'deepseek',   label: 'DeepSeek',     defaultBase: 'https://api.deepseek.com' },
  { value: 'mistral',    label: 'Mistral',       defaultBase: 'https://api.mistral.ai/v1' },
  { value: 'qwen',       label: 'Qwen',          defaultBase: 'https://dashscope.aliyuncs.com/compatible-mode/v1' },
  { value: 'minimax',    label: 'MiniMax',       defaultBase: 'https://api.minimaxi.com/v1' },
  { value: 'openrouter', label: 'OpenRouter',    defaultBase: 'https://openrouter.ai/api/v1' },
  { value: 'custom',     label: 'Custom',        defaultBase: '' },
]

const PROVIDER_MODELS = {
  openai: [
    { value: 'gpt-5.4',         label: 'GPT-5.4 (Recommended)' },
    { value: 'gpt-5.4-mini',    label: 'GPT-5.4 mini' },
    { value: 'gpt-5.4-nano',    label: 'GPT-5.4 nano' },
    { value: 'gpt-4o',          label: 'GPT-4o' },
    { value: 'gpt-4o-mini',     label: 'GPT-4o mini' },
    { value: 'o1',              label: 'o1 (Reasoning)' },
  ],
  gemini: [
    { value: 'gemini-2.5-pro',                label: 'Gemini 2.5 Pro (Recommended)' },
    { value: 'gemini-2.5-flash',              label: 'Gemini 2.5 Flash' },
    { value: 'gemini-2.5-flash-lite',        label: 'Gemini 2.5 Flash Lite' },
    { value: 'gemini-3.1-pro-preview',       label: 'Gemini 3.1 Pro Preview' },
    { value: 'gemini-3-flash-preview',       label: 'Gemini 3 Flash Preview' },
    { value: 'gemini-3.1-flash-lite-preview', label: 'Gemini 3.1 Flash Lite Preview' },
  ],
  deepseek: [
    { value: 'deepseek-chat',     label: 'DeepSeek Chat (V3.2)' },
    { value: 'deepseek-reasoner', label: 'DeepSeek Reasoner (R1)' },
  ],
  mistral: [
    { value: 'mistral-large-latest',  label: 'Mistral Large' },
    { value: 'mistral-small-latest',  label: 'Mistral Small' },
    { value: 'codestral-latest',      label: 'Codestral' },
    { value: 'open-mistral-nemo',     label: 'Mistral Nemo' },
  ],
  qwen: [
    { value: 'qwen-max',                label: 'Qwen Max' },
    { value: 'qwen-plus',               label: 'Qwen Plus' },
    { value: 'qwen-turbo',              label: 'Qwen Turbo' },
    { value: 'qwen2.5-72b-instruct',    label: 'Qwen2.5 72B Instruct' },
    { value: 'qwen2.5-32b-instruct',    label: 'Qwen2.5 32B Instruct' },
  ],
  minimax: [
    { value: 'MiniMax-M2.5',           label: 'MiniMax-M2.5' },
    { value: 'MiniMax-M2.5-highspeed', label: 'MiniMax-M2.5 Highspeed' },
    { value: 'MiniMax-M2.1',           label: 'MiniMax-M2.1' },
    { value: 'MiniMax-Text-01',        label: 'MiniMax-Text-01' },
  ],
  openrouter: [
    { value: 'anthropic/claude-opus-4-6',              label: 'Claude Opus 4.6' },
    { value: 'anthropic/claude-sonnet-4-6',            label: 'Claude Sonnet 4.6' },
    { value: 'anthropic/claude-opus-4-5',              label: 'Claude Opus 4.5' },
    { value: 'anthropic/claude-sonnet-4-5',            label: 'Claude Sonnet 4.5' },
    { value: 'google/gemini-2.5-pro',                 label: 'Gemini 2.5 Pro (via OR)' },
    { value: 'google/gemini-3.1-pro-preview',         label: 'Gemini 3.1 Pro (via OR)' },
    { value: 'meta-llama/llama-4-maverick',            label: 'Llama 4 Maverick' },
    { value: 'deepseek/deepseek-chat-v3-0324',         label: 'DeepSeek V3 (via OR)' },
    { value: 'qwen/qwen3-max',                        label: 'Qwen3 Max (via OR)' },
  ],
  custom: [],
}

const PROVIDER_KEY_PLACEHOLDER = {
  openai:     'sk-...',
  gemini:     'AIza...',
  deepseek:   'sk-...',
  mistral:    'your Mistral API key',
  qwen:       'sk-... (DashScope API key)',
  minimax:    'sk-... (MiniMax API key)',
  openrouter: 'sk-or-...',
  custom:     'your API key',
}

export default function UploadForm({ onScan, disabled }) {
  const [provider, setProvider] = useState('openai')
  const [apiKey, setApiKey] = useState('')
  const [showKey, setShowKey] = useState(false)
  const [baseUrl, setBaseUrl] = useState('')
  const [model, setModel] = useState('gpt-5.4')
  const [customModel, setCustomModel] = useState('')
  const [mode, setMode] = useState('file') // 'file' | 'folder' | 'paste'
  const [files, setFiles] = useState([])
  const [dragOver, setDragOver] = useState(false)
  const [pasteContent, setPasteContent] = useState('')
  const [pasteFilename, setPasteFilename] = useState('skill.md')
  const fileInputRef = useRef(null)

  const handleProviderChange = (newProvider) => {
    setProvider(newProvider)
    setApiKey('')
    setBaseUrl('')
    setCustomModel('')
    const models = PROVIDER_MODELS[newProvider]
    setModel(models?.length ? models[0].value : '__custom__')
  }

  const handleModeChange = (newMode) => {
    if (newMode === mode) return
    setMode(newMode)
    setFiles([])
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)

    const items = Array.from(e.dataTransfer.items)

    if (mode === 'folder') {
      // Recursively collect all files from dropped folder(s) via FileSystem API
      const entries = items
        .map((item) => item.webkitGetAsEntry?.())
        .filter(Boolean)

      if (!entries.length) return

      const collected = []   // { file, path }
      let pending = 0

      const done = () => {
        if (pending === 0 && collected.length) {
          // Attach relative path so the server sees the folder structure
          const files = collected.map(({ file, path }) => {
            Object.defineProperty(file, 'webkitRelativePath', {
              value: path,
              writable: false,
            })
            return file
          })
          setFiles(files)
        }
      }

      const SKIP_EXT = /\.(png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|pdf|zip|tar|gz|mp4|mp3|bin|exe|dll)$/i

      const readEntry = (entry, basePath) => {
        if (entry.isFile) {
          if (SKIP_EXT.test(entry.name)) return
          pending++
          entry.file((file) => {
            collected.push({ file, path: basePath + entry.name })
            pending--
            done()
          })
        } else if (entry.isDirectory) {
          pending++
          const reader = entry.createReader()
          const readAll = () => {
            reader.readEntries((entries) => {
              if (entries.length === 0) {
                pending--
                done()
                return
              }
              entries.forEach((e) => readEntry(e, basePath + entry.name + '/'))
              readAll()
            })
          }
          readAll()
        }
      }

      entries.forEach((entry) => readEntry(entry, ''))
      return
    }

    // file mode — accept individual files
    const dropped = Array.from(e.dataTransfer.files).filter((f) =>
      /\.(md|txt|json|yaml|yml|js|ts|py|sh|bash|zsh)$/i.test(f.name)
    )
    if (dropped.length) setFiles(dropped)
  }

  const handleRemoveFile = (idx) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx))
  }

  const effectiveModel = model === '__custom__' ? customModel.trim() : model

  const handleSubmit = () => {
    if (!apiKey.trim()) {
      alert('Please enter your API key.')
      return
    }
    if (!effectiveModel) {
      alert('Please enter a model name.')
      return
    }
    if (provider === 'custom' && !baseUrl.trim()) {
      alert('Please enter a Base URL for the custom provider.')
      return
    }
    if (mode === 'paste') {
      if (!pasteContent.trim()) {
        alert('Please paste some content to scan.')
        return
      }
      const filename = pasteFilename.trim() || 'skill.md'
      const blob = new Blob([pasteContent], { type: 'text/plain' })
      const file = new File([blob], filename, { type: 'text/plain' })
      onScan({ files: [file], apiKey, model: effectiveModel, provider, baseUrl: baseUrl.trim() })
      return
    }
    if (files.length === 0) {
      alert('Please select at least one file to scan.')
      return
    }
    onScan({ files, apiKey, model: effectiveModel, provider, baseUrl: baseUrl.trim() })
  }

  const models = PROVIDER_MODELS[provider] ?? []
  const providerInfo = PROVIDERS.find((p) => p.value === provider)

  return (
    <div className="uf">
      {/* Provider + API Key + Base URL + Model */}
      <div className="uf__config">

        {/* Row 1: Provider + Model */}
        <div className="uf__config-row">
          <div className="uf__field">
            <label className="uf__label">Provider</label>
            <select
              className="uf__select"
              value={provider}
              onChange={(e) => handleProviderChange(e.target.value)}
              disabled={disabled}
            >
              {PROVIDERS.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>

          <div className="uf__field uf__field--grow">
            <label className="uf__label">Model</label>
            {models.length > 0 ? (
              <>
                <select
                  className="uf__select uf__select--full"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  disabled={disabled}
                >
                  {models.map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                  <option value="__custom__">Other (enter model name…)</option>
                </select>
                {model === '__custom__' && (
                  <input
                    className="uf__input uf__input--model-custom"
                    type="text"
                    placeholder="e.g. gpt-4o-2024-11-20"
                    value={customModel}
                    onChange={(e) => setCustomModel(e.target.value)}
                    disabled={disabled}
                    spellCheck={false}
                  />
                )}
              </>
            ) : (
              <input
                className="uf__input"
                type="text"
                placeholder="e.g. my-model-name"
                value={customModel}
                onChange={(e) => setCustomModel(e.target.value)}
                disabled={disabled}
                spellCheck={false}
              />
            )}
          </div>
        </div>

        {/* Row 2: API Key + Base URL */}
        <div className="uf__config-row">
          <div className="uf__field uf__field--key">
            <label className="uf__label">API Key</label>
            <div className="uf__key-wrap">
              <input
                className="uf__input"
                type={showKey ? 'text' : 'password'}
                placeholder={PROVIDER_KEY_PLACEHOLDER[provider] ?? 'your API key'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                disabled={disabled}
                autoComplete="off"
                spellCheck={false}
              />
              <button
                className="uf__key-toggle"
                type="button"
                onClick={() => setShowKey((v) => !v)}
                tabIndex={-1}
                aria-label={showKey ? 'Hide API key' : 'Show API key'}
              >
                {showKey ? '🙈' : '👁'}
              </button>
            </div>
            <p className="uf__hint">Used for this scan only, never stored.</p>
          </div>

          <div className="uf__field uf__field--grow">
            <label className="uf__label">Base URL <span className="uf__label-opt">(optional)</span></label>
            <input
              className="uf__input"
              type="text"
              placeholder={
                provider === 'custom'
                  ? 'https://your-endpoint/v1'
                  : `Leave empty — defaults to ${providerInfo?.defaultBase ?? 'official endpoint'}`
              }
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              disabled={disabled}
              spellCheck={false}
              autoComplete="off"
            />
            <p className="uf__hint">
              {provider === 'custom'
                ? 'Required for custom provider. Must be an OpenAI-compatible endpoint.'
                : 'Override only if using a proxy or self-hosted endpoint.'}
            </p>
          </div>
        </div>

      </div>

      {/* Mode toggle */}
      <div className="uf__mode-row">
        <span className="uf__label">Upload Type</span>
        <div className="uf__mode-toggle">
          <button
            className={'uf__mode-btn' + (mode === 'file' ? ' uf__mode-btn--active' : '')}
            onClick={() => handleModeChange('file')}
            disabled={disabled}
          >
            Single / Multiple Files
          </button>
          <button
            className={'uf__mode-btn' + (mode === 'folder' ? ' uf__mode-btn--active' : '')}
            onClick={() => handleModeChange('folder')}
            disabled={disabled}
          >
            Skill Folder
          </button>
          <button
            className={'uf__mode-btn' + (mode === 'paste' ? ' uf__mode-btn--active' : '')}
            onClick={() => handleModeChange('paste')}
            disabled={disabled}
          >
            Paste Content
          </button>
        </div>
        <p className="uf__hint">
          {mode === 'file' && 'Select one or more skill files (.md, .json, .yaml, .js, .sh, etc.)'}
          {mode === 'folder' && 'Select an entire skill folder — all files will be included in the analysis.'}
          {mode === 'paste' && 'Paste the raw content of a skill file directly for quick scanning.'}
        </p>
      </div>

      {/* Paste area */}
      {mode === 'paste' && (
        <div className="uf__paste-wrap">
          <div className="uf__paste-filename-row">
            <label className="uf__label" htmlFor="paste-filename">Filename</label>
            <input
              id="paste-filename"
              className="uf__input uf__paste-filename"
              type="text"
              value={pasteFilename}
              onChange={(e) => setPasteFilename(e.target.value)}
              placeholder="skill.md"
              disabled={disabled}
              spellCheck={false}
            />
          </div>
          <textarea
            className="uf__paste-textarea"
            placeholder="Paste skill file content here…"
            value={pasteContent}
            onChange={(e) => setPasteContent(e.target.value)}
            disabled={disabled}
            spellCheck={false}
          />
          {pasteContent.length > 0 && (
            <div className="uf__paste-meta">
              <span>{pasteContent.length.toLocaleString()} chars</span>
              <button
                className="uf__file-clear"
                onClick={() => setPasteContent('')}
                disabled={disabled}
              >Clear</button>
            </div>
          )}
        </div>
      )}

      {/* Drop zone */}
      {mode !== 'paste' && (
        <div
          className={'uf__dropzone' + (dragOver ? ' uf__dropzone--over' : '') + (files.length ? ' uf__dropzone--has-files' : '')}
          onDragOver={(e) => { e.preventDefault(); if (mode !== 'paste') setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !disabled && fileInputRef.current?.click()}
          role="button"
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
          aria-label="Upload area"
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            {...(mode === 'folder' ? { webkitdirectory: '', directory: '' } : {})}
            accept={mode === 'folder' ? undefined : '.md,.txt,.json,.yaml,.yml,.js,.ts,.py,.sh,.bash,.zsh'}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          {files.length === 0 ? (
            <div className="uf__dropzone-empty">
              <span className="uf__dropzone-icon">{mode === 'folder' ? '📁' : '📄'}</span>
              <p className="uf__dropzone-primary">
                {mode === 'folder' ? 'Click to select skill folder' : 'Drop files here or click to browse'}
              </p>
              <p className="uf__dropzone-secondary">
                {mode === 'folder' ? 'Selects all files inside the folder' : '.md, .json, .yaml, .js, .sh and more'}
              </p>
            </div>
          ) : (
            <div className="uf__file-list" onClick={(e) => e.stopPropagation()}>
              <div className="uf__file-list-header">
                <span className="uf__file-count">{files.length} file{files.length !== 1 ? 's' : ''} selected</span>
                <button
                  className="uf__file-clear"
                  onClick={(e) => { e.stopPropagation(); setFiles([]); if (fileInputRef.current) fileInputRef.current.value = '' }}
                  disabled={disabled}
                >
                  Clear all
                </button>
              </div>
              <ul className="uf__files">
                {files.slice(0, 12).map((f, i) => (
                  <li key={i} className="uf__file-item">
                    <span className="uf__file-icon">{getFileIcon(f.name)}</span>
                    <span className="uf__file-name">{f.webkitRelativePath || f.name}</span>
                    <span className="uf__file-size">{formatSize(f.size)}</span>
                    {!disabled && (
                      <button
                        className="uf__file-remove"
                        onClick={(e) => { e.stopPropagation(); handleRemoveFile(i) }}
                        aria-label="Remove file"
                      >✕</button>
                    )}
                  </li>
                ))}
                {files.length > 12 && (
                  <li className="uf__file-more">+{files.length - 12} more files</li>
                )}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Submit */}
      <button
        className="uf__submit"
        onClick={handleSubmit}
        disabled={
          disabled ||
          (mode === 'paste' ? !pasteContent.trim() : files.length === 0) ||
          !apiKey.trim() ||
          !effectiveModel
        }
      >
        {disabled ? 'Scanning…' : 'Run Security Scan'}
      </button>
    </div>
  )
}

function getFileIcon(name) {
  if (/\.md$/i.test(name)) return '📝'
  if (/\.(json|yaml|yml)$/i.test(name)) return '⚙️'
  if (/\.(js|ts|jsx|tsx)$/i.test(name)) return '📜'
  if (/\.(sh|bash|zsh|ps1)$/i.test(name)) return '💻'
  if (/\.py$/i.test(name)) return '🐍'
  return '📄'
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}
