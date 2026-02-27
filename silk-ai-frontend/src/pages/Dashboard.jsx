import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, ChevronRight, FileText, Clock } from 'lucide-react'
import { toast } from 'react-hot-toast'
import Layout from '../components/Layout'
import StatusBadge from '../components/StatusBadge'
import { useAuth } from '../contexts/AuthContext'
import api from '../api/client'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function Dashboard() {
  const { user } = useAuth()
  const [cases, setCases] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/cases/')
      .then(({ data }) => setCases(data))
      .catch(() => toast.error('Failed to load cases.'))
      .finally(() => setLoading(false))
  }, [])

  const deleteCase = async (id, e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!confirm('Delete this case? This cannot be undone.')) return
    try {
      await api.delete(`/cases/${id}`)
      setCases(cases.filter((c) => c.id !== id))
      toast.success('Case deleted.')
    } catch {
      toast.error('Failed to delete case.')
    }
  }

  const stats = {
    total: cases.length,
    complete: cases.filter((c) => c.status === 'complete').length,
    processing: cases.filter((c) => c.status === 'processing' || c.status === 'pending').length,
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="section-label mb-2">Dashboard</div>
            <h1 className="font-serif text-4xl font-semibold">
              Good {getTimeOfDay()},{' '}
              <span className="gold-text">{user?.full_name?.split(' ')[0]}</span>.
            </h1>
            {user?.firm && (
              <p className="text-silk-grey text-sm mt-1">{user.firm}</p>
            )}
          </div>
          <Link to="/upload" className="btn-gold flex items-center gap-2 self-start sm:self-auto">
            <Plus size={16} /> Upload brief
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {[
            { label: 'Total cases', value: stats.total },
            { label: 'Analyses complete', value: stats.complete },
            { label: 'In progress', value: stats.processing },
          ].map(({ label, value }) => (
            <div key={label} className="glass-panel p-6">
              <div className="font-serif text-3xl font-semibold mb-1">{value}</div>
              <div className="text-silk-grey text-xs font-mono">{label}</div>
            </div>
          ))}
        </div>

        {/* Cases list */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl font-semibold">Case history</h2>
            {cases.length > 0 && (
              <span className="text-silk-grey text-xs font-mono">{cases.length} case{cases.length !== 1 ? 's' : ''}</span>
            )}
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-silk-charcoal animate-pulse card-border" />
              ))}
            </div>
          ) : cases.length === 0 ? (
            <div className="py-24 text-center border border-silk-mid/20">
              <FileText size={32} className="text-silk-mid mx-auto mb-4" />
              <h3 className="font-serif text-xl font-medium mb-2 text-silk-silver">No analyses yet</h3>
              <p className="text-silk-grey text-sm mb-8">
                Drop your brief. Get argument analysis, judge prediction, and strategy — in under 2 minutes.
              </p>
              <Link to="/upload" className="btn-gold inline-flex items-center gap-2">
                <Plus size={15} /> Upload case brief
              </Link>
            </div>
          ) : (
            <div className="space-y-1">
              {cases.map((c) => (
                <Link
                  key={c.id}
                  to={c.status === 'complete' ? `/cases/${c.id}` : '#'}
                  className={`group flex items-center justify-between p-5 border border-silk-mid/20 
                    bg-silk-charcoal hover:bg-silk-dark hover:border-silk-gold/20 
                    transition-all duration-200 ${c.status !== 'complete' ? 'cursor-default' : ''}`}
                >
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="w-9 h-9 border border-silk-mid/40 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:border-silk-gold/30 transition-colors">
                      <FileText size={15} className="text-silk-grey" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-medium text-silk-cream truncate group-hover:text-silk-gold transition-colors duration-200">
                        {c.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        {c.case_type && (
                          <span className="text-xs text-silk-grey font-mono">{c.case_type}</span>
                        )}
                        {c.jurisdiction && (
                          <>
                            <span className="text-silk-mid text-xs">·</span>
                            <span className="text-xs text-silk-grey font-mono">{c.jurisdiction}</span>
                          </>
                        )}
                        <span className="text-silk-mid text-xs">·</span>
                        <span className="flex items-center gap-1 text-xs text-silk-grey">
                          <Clock size={11} /> {formatDate(c.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 flex-shrink-0 ml-4">
                    <StatusBadge status={c.status} />
                    {c.status === 'complete' && (
                      <ChevronRight size={16} className="text-silk-mid group-hover:text-silk-gold transition-colors" />
                    )}
                    <button
                      onClick={(e) => deleteCase(c.id, e)}
                      className="text-silk-mid hover:text-red-400 transition-colors text-xs font-mono ml-2 hidden group-hover:block"
                    >
                      delete
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

function getTimeOfDay() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
}
