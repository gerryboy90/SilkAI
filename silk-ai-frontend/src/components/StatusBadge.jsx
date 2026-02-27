const STATUS_CONFIG = {
  pending: { label: 'Pending', color: 'text-silk-silver', dot: 'bg-silk-silver' },
  processing: { label: 'Analysing', color: 'text-silk-gold', dot: 'bg-silk-gold animate-pulse' },
  complete: { label: 'Complete', color: 'text-green-400', dot: 'bg-green-400' },
  failed: { label: 'Failed', color: 'text-red-400', dot: 'bg-red-400' },
}

export default function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending
  return (
    <span className={`flex items-center gap-1.5 text-xs font-mono ${cfg.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  )
}
