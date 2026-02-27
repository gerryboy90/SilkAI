import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-hot-toast'
import { Upload, FileText, X, ArrowRight, Info } from 'lucide-react'
import Layout from '../components/Layout'
import api from '../api/client'

const CASE_TYPES = [
  'Commercial', 'Criminal', 'Constitutional', 'Employment', 'Family',
  'Immigration', 'Intellectual Property', 'Personal Injury', 'Property',
  'Tax', 'Tort', 'Other',
]

const JURISDICTIONS = [
  'England and Wales', 'Scotland', 'Northern Ireland',
  'Australia', 'Nigeria', 'Canada', 'India',
  'International / Cross-Jurisdictional', 'Other',
]

export default function UploadCase() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '',
    brief_raw: '',
    case_type: '',
    jurisdiction: '',
  })
  const [loading, setLoading] = useState(false)
  const [charCount, setCharCount] = useState(0)

  const set = (key) => (e) => {
    const val = e.target.value
    setForm({ ...form, [key]: val })
    if (key === 'brief_raw') setCharCount(val.length)
  }

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target.result
      setForm((f) => ({ ...f, brief_raw: text }))
      setCharCount(text.length)
      toast.success(`Loaded: ${file.name}`)
    }
    reader.readAsText(file)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/plain': ['.txt'], 'application/msword': ['.doc'], 'application/pdf': ['.pdf'] },
    maxFiles: 1,
  })

  const clearBrief = () => {
    setForm({ ...form, brief_raw: '' })
    setCharCount(0)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) return toast.error('Please provide a case title.')
    if (!form.brief_raw.trim() || form.brief_raw.trim().length < 100) {
      return toast.error('Brief is too short. Provide at least 100 characters.')
    }

    setLoading(true)
    try {
      const { data } = await api.post('/cases/', form)
      toast.success('Case submitted. Analysis in progress.')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.detail ?? 'Submission failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10">
          <div className="section-label mb-2">New case</div>
          <h1 className="font-serif text-4xl font-semibold mb-3">Upload case brief</h1>
          <p className="text-silk-grey text-sm leading-relaxed">
            Brief anonymized, then analyzed. Full strategy report in under 2 minutes.
            Client names and identifiers stay redacted. Always.
          </p>
        </div>

        {/* Anonymization notice */}
        <div className="flex items-start gap-3 p-4 border border-silk-gold/20 bg-silk-charcoal mb-8">
          <Info size={15} className="text-silk-gold flex-shrink-0 mt-0.5" />
          <p className="text-silk-silver text-xs leading-relaxed">
            <strong className="text-silk-gold">Privacy:</strong> spaCy NER + Claude verification anonymizes your brief before any AI sees it.
            Submit the unredacted version — we handle the rest.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7">
          {/* Case title */}
          <div>
            <label className="block text-silk-silver text-xs font-mono mb-2 tracking-wider uppercase">
              Case title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={set('title')}
              className="input-field"
              placeholder="e.g. Contract Dispute — Supply of Goods Act Claim"
            />
          </div>

          {/* Case type + jurisdiction */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-silk-silver text-xs font-mono mb-2 tracking-wider uppercase">
                Case type
              </label>
              <select
                value={form.case_type}
                onChange={set('case_type')}
                className="input-field"
              >
                <option value="">Select case type</option>
                {CASE_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-silk-silver text-xs font-mono mb-2 tracking-wider uppercase">
                Jurisdiction
              </label>
              <select
                value={form.jurisdiction}
                onChange={set('jurisdiction')}
                className="input-field"
              >
                <option value="">Select jurisdiction</option>
                {JURISDICTIONS.map((j) => (
                  <option key={j} value={j}>{j}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Brief input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-silk-silver text-xs font-mono tracking-wider uppercase">
                Case brief <span className="text-red-400">*</span>
              </label>
              {charCount > 0 && (
                <button
                  type="button"
                  onClick={clearBrief}
                  className="flex items-center gap-1 text-silk-grey hover:text-red-400 text-xs font-mono transition-colors"
                >
                  <X size={12} /> Clear
                </button>
              )}
            </div>

            {/* File drop zone */}
            {!form.brief_raw && (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-200 mb-3
                  ${isDragActive
                    ? 'border-silk-gold bg-silk-gold/5'
                    : 'border-silk-mid/40 hover:border-silk-gold/40 hover:bg-silk-charcoal'
                  }`}
              >
                <input {...getInputProps()} />
                <Upload size={24} className="text-silk-grey mx-auto mb-3" />
                <p className="text-silk-silver text-sm font-medium">
                  {isDragActive ? 'Drop your brief here' : 'Drop a file or click to browse'}
                </p>
                <p className="text-silk-grey text-xs mt-1">.txt, .doc, .pdf accepted</p>
              </div>
            )}

            <div className="relative">
              <textarea
                required
                value={form.brief_raw}
                onChange={set('brief_raw')}
                rows={form.brief_raw ? 16 : 6}
                className="input-field resize-none font-mono text-sm leading-relaxed"
                placeholder="Or paste your case brief directly here…

Include: case background, parties' positions, key facts, relevant law, and any known precedents. The more detail you provide, the more precise the analysis."
              />
              {form.brief_raw && (
                <div className="flex items-center justify-between mt-2">
                  <span className="text-silk-grey text-xs font-mono flex items-center gap-1.5">
                    <FileText size={11} />
                    {charCount.toLocaleString()} characters
                  </span>
                  {charCount < 100 && (
                    <span className="text-red-400/70 text-xs font-mono">Minimum 100 characters</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading || !form.brief_raw.trim()}
              className={`btn-gold w-full flex items-center justify-center gap-2 py-4 text-base
                ${(loading || !form.brief_raw.trim()) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <span className="animate-pulse">Generating your report…</span>
              ) : (
                <>
                  Get my strategy report <ArrowRight size={16} />
                </>
              )}
            </button>
            <p className="text-center text-silk-grey text-xs mt-3 font-mono">
              Report ready in under 2 minutes
            </p>
          </div>
        </form>
      </div>
    </Layout>
  )
}
