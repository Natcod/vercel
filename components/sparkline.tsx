type SparklineProps = {
  data?: number[]
  width?: number
  height?: number
  stroke?: string
  strokeWidth?: number
  className?: string
  showBaseline?: boolean
}

export default function Sparkline({
  data = [],
  width = 80,
  height = 24,
  stroke = "var(--accent)",
  strokeWidth = 2,
  className,
  showBaseline = true,
}: SparklineProps) {
  if (!data.length) {
    // render faint empty line to keep layout stable
    return (
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className={className}
        aria-hidden="true"
        focusable="false"
      >
        {showBaseline && (
          <line
            x1="0"
            x2={width}
            y1={Math.floor(height * 0.6)}
            y2={Math.floor(height * 0.6)}
            stroke="rgba(123,135,148,0.25)"
            strokeDasharray="3 3"
            strokeWidth="1"
          />
        )}
      </svg>
    )
  }

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const stepX = width / Math.max(data.length - 1, 1)

  const points = data.map((v, i) => {
    const x = Math.round(i * stepX)
    // Flip y for SVG coord system and add 1px padding
    const y = Math.round(height - ((v - min) / range) * (height - 2) - 1)
    return `${x},${y}`
  })

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {showBaseline && (
        <line
          x1="0"
          x2={width}
          y1={Math.floor(height * 0.7)}
          y2={Math.floor(height * 0.7)}
          stroke="rgba(123,135,148,0.25)"
          strokeDasharray="3 3"
          strokeWidth="1"
        />
      )}
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}
