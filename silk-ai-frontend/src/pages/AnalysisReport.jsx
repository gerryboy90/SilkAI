import { useState, useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import {
  ArrowLeft, Download, Brain, Scale, FileText,
  Users, Shield, ChevronDown, ChevronUp, AlertTriangle,
  TrendingUp, Clock, CheckCircle,
} from 'lucide-react'
import Layout from '../components/Layout'
import ScoreBar from '../components/ScoreBar'
import api from '../api/client'

const POLL_INTERVAL_MS = 4000

export default function AnalysisReport() {
  const { caseId } = useParams()
  const navigate = useNavigate()
  const [caseData, setCaseData] = useState(null)
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [polling, setPolling] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [expanded, setExpanded] = useState({})
  const pollRef = useRef(null)

  const toggleExpanded = (key) => setExpanded((e) => ({ ...e, [key]: !e[key] }))

  const fetchCase = async () => {
    try {
      const { data } = await api.get(`/cases/${caseId}`)
      setCaseData(data)
      return data
    } catch (err) {
      if (err.response?.status === 404) {
        toast.error('Case not found.')
        navigate('/dashboard')
      }
      return null
    }
  }

  const fetchReport = async () => {
    try {
      const { data } = await api.get(`/analysis/${caseId}`)
      setReport(data)
      return data
    } catch (err) {
      if (err.response?.status === 202) return null // still processing
      return null
    }
  }

  useEffect(() => {
    const init = async () => {
      const caseResult = await fetchCase()
      if (!caseResult) return

      if (caseResult.status === 'complete') {
        await fetchReport()
        setLoading(false)
      } else if (caseResult.status === 'failed') {
        setLoading(false)
      } else {
        setLoading(false)
        setPolling(true)
        pollRef.current = setInterval(async () => {
          const updated = await fetchCase()
          if (updated?.status === 'complete') {
            clearInterval(pollRef.current)
            await fetchReport()
            setPolling(false)
          } else if (updated?.status === 'failed') {
            clearInterval(pollRef.current)
            setPolling(false)
          }
        }, POLL_INTERVAL_MS)
      }
    }

    init()
    return () => clearInterval(pollRef.current)
  }, [caseId])

  const downloadPdf = async () => {
    setDownloading(true)
    try {
      const response = await api.get(`/analysis/${caseId}/pdf`, { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `SilkAI_${caseData?.title?.replace(/[^a-z0-9]/gi, '_')}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      toast.success('Report downloaded.')
    } catch {
      toast.error('PDF download failed.')
    } finally {
      setDownloading(false)
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-12 h-12 border border-silk-gold/30 border-t-silk-gold rounded-full animate-spin mx-auto mb-4" />
            <p className="text-silk-grey font-mono text-sm">Loading report…</p>
          </div>
        </div>
      </Layout>
    )
  }

  const isProcessing = caseData?.status === 'pending' || caseData?.status === 'processing'
  const isFailed = caseData?.status === 'failed'

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back + header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-10">
          <div>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-silk-grey hover:text-silk-cream text-sm font-mono transition-colors mb-4"
            >
              <ArrowLeft size={14} /> Dashboard
            </Link>
            <div className="section-label mb-2">Case analysis</div>
            <h1 className="font-serif text-3xl font-semibold">{caseData?.title}</h1>
            <div className="flex items-center gap-3 mt-2">
              {caseData?.case_type && (
                <span className="text-silk-grey text-xs font-mono">{caseData.case_type}</span>
              )}
              {caseData?.jurisdiction && (
                <>
                  <span className="text-silk-mid text-xs">·</span>
                  <span className="text-silk-grey text-xs font-mono">{caseData.jurisdiction}</span>
                </>
              )}
            </div>
          </div>

          {report && (
            <button
              onClick={downloadPdf}
              disabled={downloading}
              className="btn-ghost flex items-center gap-2 self-start text-sm"
            >
              <Download size={14} />
              {downloading ? 'Downloading…' : 'Export PDF'}
            </button>
          )}
        </div>

        {/* Processing state */}
        {isProcessing && (
          <div className="py-20 text-center glass-panel">
            <div className="w-12 h-12 border border-silk-gold/30 border-t-silk-gold rounded-full animate-spin mx-auto mb-6" />
            <h2 className="font-serif text-2xl font-semibold mb-3">Analysis in progress</h2>
            <p className="text-silk-grey text-sm max-w-sm mx-auto leading-relaxed">
              Anonymizing brief, analysing arguments, predicting outcomes, and assembling your strategy report.
              This typically takes 30–60 seconds.
            </p>
            <div className="flex items-center justify-center gap-2 mt-8 text-silk-gold/60 text-xs font-mono">
              <Clock size={12} /> Polling for completion…
            </div>
          </div>
        )}

        {/* Failed state */}
        {isFailed && (
          <div className="py-20 text-center glass-panel border-red-900/20">
            <AlertTriangle size={32} className="text-red-400 mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-semibold mb-3">Analysis failed</h2>
            <p className="text-silk-grey text-sm mb-8">
              The analysis could not be completed. This may be a temporary issue.
            </p>
            <Link to="/upload" className="btn-gold inline-flex items-center gap-2">
              Submit new brief
            </Link>
          </div>
        )}

        {/* Full report */}
        {report && (
          <div className="space-y-6">
            {/* Overall strength gauge */}
            {report.overall_strength != null && (
              <motion.div
                className="glass-panel p-6 flex flex-col sm:flex-row sm:items-center gap-6 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Radial glow behind score */}
                <div
                  className="absolute top-1/2 left-8 -translate-y-1/2 w-32 h-32 rounded-full opacity-[0.10]"
                  style={{
                    background: `radial-gradient(circle, ${
                      report.overall_strength >= 7 ? 'rgba(76, 175, 80, 0.5)' :
                      report.overall_strength >= 5 ? 'rgba(201, 168, 76, 0.5)' : 'rgba(176, 48, 48, 0.5)'
                    } 0%, transparent 70%)`,
                    filter: 'blur(30px)',
                  }}
                />
                <div className="flex-shrink-0 relative z-10">
                  <div className="section-label mb-1">Overall argument strength</div>
                  <div className="font-serif text-5xl font-semibold">
                    <span
                      style={{
                        color: report.overall_strength >= 7 ? '#4CAF50' :
                               report.overall_strength >= 5 ? '#C9A84C' : '#B03030'
                      }}
                    >
                      {report.overall_strength.toFixed(1)}
                    </span>
                    <span className="text-silk-grey text-2xl">/10</span>
                  </div>
                </div>
                <div className="flex-1 relative z-10">
                  <ScoreBar score={report.overall_strength} />
                  <p className="text-silk-grey text-xs mt-3">
                    Average across {report.argument_scores?.length ?? 0} scored arguments.
                  </p>
                </div>
              </motion.div>
            )}

            {/* 1. Argument Style */}
            <ReportSection
              icon={Brain}
              number="01"
              title="Recommended Argument Style"
              expanded={expanded['style']}
              onToggle={() => toggleExpanded('style')}
            >
              {report.recommended_argument_style && (
                <div className="mb-4">
                  <div className="section-label mb-2">Recommended style</div>
                  <div className="font-serif text-2xl font-semibold gold-text">
                    {report.recommended_argument_style}
                  </div>
                </div>
              )}
              {report.argument_style_rationale && (
                <p className="text-silk-silver text-sm leading-relaxed">
                  {report.argument_style_rationale}
                </p>
              )}
            </ReportSection>

            {/* 2. Barrister Profiles */}
            {report.barrister_profiles?.length > 0 && (
              <ReportSection
                icon={Users}
                number="02"
                title="Known Barrister Profiles"
                expanded={expanded['barristers']}
                onToggle={() => toggleExpanded('barristers')}
              >
                <div className="space-y-6">
                  {report.barrister_profiles.map((bp, i) => (
                    <div key={i} className="border-l-2 border-silk-gold/30 pl-5">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h4 className="font-serif text-lg font-semibold">{bp.name}</h4>
                        {bp.era && (
                          <span className="text-silk-grey text-xs font-mono flex-shrink-0">{bp.era}</span>
                        )}
                      </div>
                      <div className="space-y-2 text-sm">
                        <p className="text-silk-grey">
                          <span className="text-silk-silver font-medium">Known for: </span>
                          {bp.known_for}
                        </p>
                        <p className="text-silk-grey">
                          <span className="text-silk-silver font-medium">Argument style: </span>
                          {bp.argument_style}
                        </p>
                        <p className="text-silk-grey">
                          <span className="text-silk-gold font-medium">Key lessons: </span>
                          {bp.key_lessons}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ReportSection>
            )}

            {/* 3. Judge Ruling Prediction */}
            <ReportSection
              icon={Scale}
              number="03"
              title="Judge Ruling Prediction"
              expanded={expanded['prediction']}
              onToggle={() => toggleExpanded('prediction')}
            >
              {report.ruling_confidence != null && (
                <div className="flex items-center gap-3 mb-5">
                  <div className="section-label">Confidence</div>
                  <div className="font-serif text-3xl font-semibold" style={{
                    color: report.ruling_confidence >= 0.7 ? '#4CAF50' :
                           report.ruling_confidence >= 0.5 ? '#C9A84C' : '#B03030'
                  }}>
                    {Math.round(report.ruling_confidence * 100)}%
                  </div>
                </div>
              )}
              {report.ruling_prediction && (
                <p className="text-silk-silver text-sm leading-relaxed mb-5">
                  {report.ruling_prediction}
                </p>
              )}
              {report.precedent_cases?.length > 0 && (
                <div>
                  <div className="section-label mb-3">Relevant precedents</div>
                  <div className="space-y-2">
                    {report.precedent_cases.map((pc, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-silk-grey">
                        <span className="text-silk-gold mt-0.5">—</span>
                        <span className="font-mono">{pc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </ReportSection>

            {/* 4. Argument Scores */}
            {report.argument_scores?.length > 0 && (
              <ReportSection
                icon={TrendingUp}
                number="04"
                title="Argument Strength Scoring"
                expanded={expanded['scores']}
                onToggle={() => toggleExpanded('scores')}
              >
                <div className="space-y-8">
                  {report.argument_scores.map((arg, i) => (
                    <div key={i}>
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <p className="text-silk-cream text-sm font-medium flex-1">{arg.argument}</p>
                      </div>
                      <ScoreBar score={arg.score} className="mb-3" />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                        {arg.weakness && (
                          <div className="p-3 bg-red-950/20 border border-red-900/20">
                            <div className="text-xs font-mono text-red-400 mb-1">Weakness</div>
                            <p className="text-silk-silver text-xs leading-relaxed">{arg.weakness}</p>
                          </div>
                        )}
                        {arg.recommended_pivot && (
                          <div className="p-3 bg-green-950/20 border border-green-900/20">
                            <div className="text-xs font-mono text-green-400 mb-1">Recommended pivot</div>
                            <p className="text-silk-silver text-xs leading-relaxed">{arg.recommended_pivot}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ReportSection>
            )}

            {/* 5. Case Strategy Report */}
            <ReportSection
              icon={FileText}
              number="05"
              title="Case Strategy Report"
              expanded={expanded['strategy']}
              onToggle={() => toggleExpanded('strategy')}
              defaultExpanded
            >
              {report.recommended_approach && (
                <div className="mb-7">
                  <div className="section-label mb-3">Recommended approach</div>
                  <p className="text-silk-silver text-sm leading-relaxed">
                    {report.recommended_approach}
                  </p>
                </div>
              )}

              {report.opposition_arguments?.length > 0 && (
                <div className="mb-7">
                  <div className="section-label mb-3">Likely opposition arguments</div>
                  <ul className="space-y-2">
                    {report.opposition_arguments.map((oa, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-silk-grey">
                        <AlertTriangle size={13} className="text-yellow-500/60 flex-shrink-0 mt-0.5" />
                        {oa}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {report.risk_areas?.length > 0 && (
                <div className="mb-7">
                  <div className="section-label mb-3">Risk areas</div>
                  <ul className="space-y-2">
                    {report.risk_areas.map((ra, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-silk-grey">
                        <Shield size={13} className="text-red-400/60 flex-shrink-0 mt-0.5" />
                        {ra}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {report.preparation_steps?.length > 0 && (
                <div>
                  <div className="section-label mb-3">Preparation steps</div>
                  <ol className="space-y-3">
                    {report.preparation_steps.map((ps, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-silk-grey">
                        <span className="text-silk-gold font-mono text-xs mt-0.5 flex-shrink-0 w-4">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="flex-1">{ps}</span>
                        <CheckCircle size={13} className="text-green-500/40 flex-shrink-0 mt-0.5" />
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </ReportSection>

            {/* PDF export CTA */}
            <div className="glass-panel glow-gold p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-serif text-lg font-semibold">Export your strategy report</p>
                <p className="text-silk-grey text-sm">Download as formatted PDF for client briefings and court preparation.</p>
              </div>
              <button
                onClick={downloadPdf}
                disabled={downloading}
                className="btn-gold flex items-center gap-2 flex-shrink-0"
              >
                <Download size={15} />
                {downloading ? 'Preparing PDF…' : 'Download PDF'}
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

function ReportSection({ icon: Icon, number, title, children, expanded: expandedProp, onToggle, defaultExpanded }) {
  const [localExpanded, setLocalExpanded] = useState(defaultExpanded ?? true)
  const isExpanded = expandedProp !== undefined ? expandedProp : localExpanded
  const toggle = onToggle ?? (() => setLocalExpanded(!localExpanded))

  return (
    <motion.div
      className={`glass-panel overflow-hidden transition-all duration-300 ${
        isExpanded ? 'border-l-2 border-l-silk-gold/40' : ''
      }`}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between p-5 hover:bg-silk-charcoal/50 transition-colors duration-200"
      >
        <div className="flex items-center gap-4">
          <div className={`w-9 h-9 border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
            isExpanded ? 'border-silk-gold/40 shadow-[0_0_15px_rgba(201,168,76,0.1)]' : 'border-silk-gold/20'
          }`}>
            <Icon size={16} className="text-silk-gold" />
          </div>
          <div className="text-left">
            <div className="text-silk-grey text-xs font-mono">{number}</div>
            <h3 className="font-serif text-lg font-semibold">{title}</h3>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp size={16} className="text-silk-grey" />
        ) : (
          <ChevronDown size={16} className="text-silk-grey" />
        )}
      </button>
      {isExpanded && (
        <div className="px-5 pb-6 border-t border-silk-mid/20 pt-5">
          {children}
        </div>
      )}
    </motion.div>
  )
}
