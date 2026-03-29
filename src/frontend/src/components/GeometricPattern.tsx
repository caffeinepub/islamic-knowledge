export function GeometricPatternCorner({
  className = "",
}: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="geo-pattern"
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M20 0 L40 10 L40 30 L20 40 L0 30 L0 10 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.4"
          />
          <path
            d="M20 5 L35 12 L35 28 L20 35 L5 28 L5 12 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.3"
            opacity="0.3"
          />
          <circle
            cx="20"
            cy="20"
            r="3"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.4"
            opacity="0.4"
          />
          <line
            x1="0"
            y1="0"
            x2="20"
            y2="20"
            stroke="currentColor"
            strokeWidth="0.3"
            opacity="0.2"
          />
          <line
            x1="40"
            y1="0"
            x2="20"
            y2="20"
            stroke="currentColor"
            strokeWidth="0.3"
            opacity="0.2"
          />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#geo-pattern)" />
      {/* Star of 8 in center */}
      <g transform="translate(100, 100)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line
            key={angle}
            x1="0"
            y1="0"
            x2={Math.cos((angle * Math.PI) / 180) * 90}
            y2={Math.sin((angle * Math.PI) / 180) * 90}
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.2"
          />
        ))}
        <polygon
          points="0,-30 10,-10 30,0 10,10 0,30 -10,10 -30,0 -10,-10"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity="0.5"
        />
      </g>
    </svg>
  );
}

export function ArabesqueDecor({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <g key={`arb-${i}`} transform={`translate(${i * 40 + 20}, 50)`}>
          <path
            d="M0,-30 Q10,-15 0,0 Q-10,-15 0,-30 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.4"
          />
          <path
            d="M0,30 Q10,15 0,0 Q-10,15 0,30 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.4"
          />
          <circle
            cx="0"
            cy="0"
            r="3"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0.5"
          />
        </g>
      ))}
    </svg>
  );
}

export function StarSeparator({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <line
        x1="0"
        y1="12"
        x2="45"
        y2="12"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
      <polygon
        points="60,4 63,10 70,10 65,15 67,22 60,18 53,22 55,15 50,10 57,10"
        fill="currentColor"
        opacity="0.7"
      />
      <line
        x1="75"
        y1="12"
        x2="120"
        y2="12"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  );
}
