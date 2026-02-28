export default function ScoreBar({ score, max = 10, className = '' }) {
  const pct = Math.min(100, (score / max) * 100)
  const color =
    score >= 7 ? '#4CAF50' :
    score >= 5 ? '#C9A84C' :
    '#B03030'

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-mono text-silk-grey">{score.toFixed(1)}/{max}</span>
        <span
          className="text-xs font-semibold font-mono"
          style={{ color }}
        >
          {score >= 7 ? 'STRONG' : score >= 5 ? 'MODERATE' : 'WEAK'}
        </span>
      </div>
      <div className="h-1.5 bg-silk-mid/50 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${pct}%`,
            backgroundColor: color,
            boxShadow: `0 0 8px ${color}40, 0 0 16px ${color}20`,
          }}
        />
      </div>
    </div>
  )
}
