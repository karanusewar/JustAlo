import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'symbol';
  className?: string;
}

export const JustaloLogo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'full',
  className = '',
}) => {
  const sizeMap = {
    sm: { symbol: 28, text: 'text-sm' },
    md: { symbol: 36, text: 'text-base' },
    lg: { symbol: 48, text: 'text-xl' },
    xl: { symbol: 64, text: 'text-2xl' },
  };

  const currentSize = sizeMap[size];

  // The symbol matching the uploaded Project_Logo.png:
  // Cyan/teal crescent framing white circle with JUST in black and ALO in red
  const symbolSvg = (
    <svg
      width={currentSize.symbol}
      height={currentSize.symbol}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      {/* Outer Cyan Ring/Crescent */}
      <circle cx="50" cy="50" r="48" fill="#00BAC7" />

      {/* Offset Inner White Circle creating the crescent on top */}
      <circle cx="50" cy="54" r="40" fill="#FFFFFF" />

      {/* Internal Typography: JUST in black, ALO in red */}
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
        fontWeight="900"
        fontSize="17"
        letterSpacing="-0.5px"
      >
        <tspan fill="#000000">JUST</tspan>
        <tspan fill="#ED1C24">ALO</tspan>
      </text>
    </svg>
  );

  if (variant === 'symbol') {
    return <div className={`inline-flex items-center ${className}`}>{symbolSvg}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {symbolSvg}
      <div className="flex flex-col text-left leading-none">
        <div className={`font-black tracking-tight ${currentSize.text}`}>
          <span className="text-slate-900">JUST</span>
          <span className="text-[#ED1C24]">ALO</span>
        </div>
        <span className="text-[9px] font-bold text-slate-600 tracking-wider uppercase mt-0.5">
          Transit Mobility
        </span>
      </div>
    </div>
  );
};
