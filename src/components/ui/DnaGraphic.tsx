// A decorative helix, independent of the company's logo.
const helixX = (y: number, side: number) =>
  160 + side * 67 * Math.cos(((y - 30) / 160) * Math.PI * 2)
const strand = (side: number) =>
  Array.from({ length: 81 }, (_, i) => {
    const y = 30 + i * 4
    return (i === 0 ? 'M' : 'L') + helixX(y, side).toFixed(2) + ' ' + y
  }).join(' ')
const rungs = Array.from({ length: 17 }, (_, i) => {
  const y = 30 + i * 20
  return (
    'M' + helixX(y, 1).toFixed(2) + ' ' + y + 'H' + helixX(y, -1).toFixed(2)
  )
}).join(' ')

export default function DnaGraphic({ className = '' }: { className?: string }) {
  return (
    <svg
      className={'dna-graphic ' + className}
      viewBox="0 0 320 400"
      fill="none"
      aria-hidden="true"
    >
      <path className="dna-path" d={strand(1)} pathLength="1" />
      <path className="dna-path" d={strand(-1)} pathLength="1" />
      <g className="dna-rungs">
        <path d={rungs} />
      </g>
      <circle cx="93" cy="30" r="4" />
      <circle cx="227" cy="30" r="4" />
      <circle cx="93" cy="350" r="4" />
      <circle cx="227" cy="350" r="4" />
    </svg>
  )
}
