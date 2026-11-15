/**
 * Diagrama TI 360 — 5 frentes orbitando o círculo central.
 * Desktop (≥720px): SVG completo. Mobile: lista empilhada.
 */

const frentes = [
  {
    num: '01',
    title: 'Diagnóstico',
    titleBreak: 'Tecnológico e Inovação',
    side: 'left',
    row: 0,
    icon: (
      <g>
        <rect x="8" y="6" width="18" height="22" rx="2.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M12 12h8M12 16h8M12 20h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="22" cy="22" r="4.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M25 25l2.5 2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </g>
    ),
  },
  {
    num: '02',
    title: 'Proteção Empresarial',
    titleBreak: 'e Continuidade',
    side: 'left',
    row: 1,
    icon: (
      <path
        d="M17 4L7 8v9c0 6 4.5 10.5 10 12 5.5-1.5 10-6 10-12V8l-10-4z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    ),
  },
  {
    num: '03',
    title: 'Eficiência',
    titleBreak: 'Operacional',
    side: 'left',
    row: 2,
    icon: (
      <g strokeLinecap="round">
        <path d="M6 26V18M12 26V12M18 26V15M24 26V8" stroke="currentColor" strokeWidth="2.5" />
        <path d="M4 28h26" stroke="currentColor" strokeWidth="2" />
      </g>
    ),
  },
  {
    num: '04',
    title: 'Organização, Controle',
    titleBreak: 'e Segurança',
    side: 'right',
    row: 0,
    icon: (
      <g>
        <circle cx="17" cy="17" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <path
          d="M17 4v3M17 27v3M30 17h-3M7 17H4M26.5 7.5l-2 2M9.5 24.5l-2 2M26.5 26.5l-2-2M9.5 9.5l-2-2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    ),
  },
  {
    num: '05',
    title: 'Consultoria e Gestão',
    titleBreak: 'Tecnológica',
    side: 'right',
    row: 2,
    icon: (
      <g>
        <path
          d="M17 5a8 8 0 00-5 14l1 2v3h8v-3l1-2a8 8 0 00-5-14z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M14 28h6M15 30h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </g>
    ),
  },
]

// Coordenadas no viewBox 800x600
const CENTER = { x: 400, y: 300 }
const CORE_R = 115
const NODE_R = 42
const NODE_POSITIONS = {
  'left-0': { x: 100, y: 110 },
  'left-1': { x: 70, y: 300 },
  'left-2': { x: 100, y: 490 },
  'right-0': { x: 700, y: 170 },
  'right-2': { x: 700, y: 430 },
}

function Connector({ from, to }) {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const midX = from.x + dx * 0.5
  const midY = from.y + dy * 0.5
  const ctrlX = midX + dy * 0.08
  const ctrlY = midY - dx * 0.08
  return (
    <path
      d={`M ${from.x} ${from.y} Q ${ctrlX} ${ctrlY} ${to.x} ${to.y}`}
      stroke="rgba(95,209,230,0.35)"
      strokeWidth="1.5"
      strokeDasharray="4 5"
      fill="none"
    />
  )
}

function Node({ frente }) {
  const pos = NODE_POSITIONS[`${frente.side}-${frente.row}`]
  const textAnchorX = frente.side === 'left' ? pos.x + NODE_R + 14 : pos.x - NODE_R - 14
  const textAnchor = frente.side === 'left' ? 'start' : 'end'

  return (
    <g>
      <circle cx={pos.x} cy={pos.y} r={NODE_R + 8} fill="rgba(3,58,202,0.12)" />
      <circle
        cx={pos.x}
        cy={pos.y}
        r={NODE_R}
        fill="url(#nodeGrad)"
        stroke="rgba(3,58,202,0.6)"
        strokeWidth="1.5"
      />
      <g transform={`translate(${pos.x - 17}, ${pos.y - 17})`} color="#1e5bff">
        {frente.icon}
      </g>
      <text
        x={textAnchorX}
        y={pos.y - 10}
        textAnchor={textAnchor}
        fontFamily="Fraunces, Georgia, serif"
        fontStyle="italic"
        fontWeight="600"
        fontSize="38"
        fill="#1e5bff"
      >
        {frente.num}
      </text>
      <text
        x={textAnchorX}
        y={pos.y + 14}
        textAnchor={textAnchor}
        fontFamily="Montserrat, system-ui, sans-serif"
        fontWeight="700"
        fontSize="16"
        fill="#ffffff"
      >
        {frente.title}
      </text>
      <text
        x={textAnchorX}
        y={pos.y + 34}
        textAnchor={textAnchor}
        fontFamily="Montserrat, system-ui, sans-serif"
        fontWeight="500"
        fontSize="14"
        fill="rgba(233,238,247,0.72)"
      >
        {frente.titleBreak}
      </text>
    </g>
  )
}

export default function TI360Diagram() {
  return (
    <div className="w-full">
      {/* Desktop: SVG completo */}
      <div className="hidden md:block">
        <svg
          viewBox="0 0 800 600"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          role="img"
          aria-label="Diagrama TI 360 com as 5 frentes do portfólio"
        >
          <defs>
            <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#033aca" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#021d6b" stopOpacity="1" />
              <stop offset="100%" stopColor="#07142e" stopOpacity="1" />
            </radialGradient>
            <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#112a55" />
              <stop offset="100%" stopColor="#0a1c3a" />
            </radialGradient>
            <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Conectores dos 5 nodes até o core */}
          {frentes.map((f) => {
            const pos = NODE_POSITIONS[`${f.side}-${f.row}`]
            const dx = pos.x - CENTER.x
            const dy = pos.y - CENTER.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            const coreEdge = {
              x: CENTER.x + (dx / dist) * CORE_R,
              y: CENTER.y + (dy / dist) * CORE_R,
            }
            const nodeEdge = {
              x: pos.x - (dx / dist) * NODE_R,
              y: pos.y - (dy / dist) * NODE_R,
            }
            return <Connector key={f.num} from={nodeEdge} to={coreEdge} />
          })}

          {/* Core */}
          <g filter="url(#softGlow)">
            <circle
              cx={CENTER.x}
              cy={CENTER.y}
              r={CORE_R}
              fill="url(#coreGrad)"
              stroke="rgba(30,91,255,0.5)"
              strokeWidth="2"
            />
          </g>
          <text
            x={CENTER.x}
            y={CENTER.y + 18}
            textAnchor="middle"
            fontFamily="Fraunces, Georgia, serif"
            fontWeight="700"
            fontSize="60"
            fill="#ffffff"
            letterSpacing="-0.02em"
          >
            TI <tspan fill="#4a7dff">360</tspan>
          </text>

          {frentes.map((f) => (
            <Node key={f.num} frente={f} />
          ))}
        </svg>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <div className="relative mx-auto w-32 h-32 mb-8">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#033aca] to-[#07142e] border-2 border-[#4a7dff]/50 shadow-[0_0_40px_rgba(30,91,255,0.3)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-['Fraunces',Georgia,serif] font-bold text-white text-2xl leading-none">
              TI<span className="text-[#4a7dff]"> 360</span>
            </span>
          </div>
        </div>
        <ul className="list-none p-0 m-0 flex flex-col gap-3">
          {frentes.map((f) => (
            <li
              key={f.num}
              className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10"
            >
              <div className="relative flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#112a55] to-[#0a1c3a] border border-[#033aca]/50 flex items-center justify-center">
                <svg
                  viewBox="0 0 34 34"
                  width="22"
                  height="22"
                  style={{ color: '#1e5bff' }}
                  aria-hidden="true"
                >
                  {f.icon}
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-['Fraunces',Georgia,serif] italic font-semibold text-[#1e5bff] text-xl leading-none">
                    {f.num}
                  </span>
                  <span className="text-white font-semibold text-[0.95rem] leading-tight">
                    {f.title} {f.titleBreak}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
