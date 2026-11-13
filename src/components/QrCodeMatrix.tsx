import React from 'react';

interface QrCodeMatrixProps {
  value: string;
  size?: number;
  label?: string;
  sublabel?: string;
  caption?: string;
  customImageUrl?: string;
}

/**
 * Deterministic 21x21 QR Code SVG generator with standard 7x7 finder patterns,
 * timing tracks, and hashed data modules. Also supports displaying an uploaded
 * custom Bank QR image if the member uploaded a photo of their bank QR code.
 */
export const QrCodeMatrix: React.FC<QrCodeMatrixProps> = ({
  value,
  size = 148,
  label,
  sublabel,
  caption,
  customImageUrl,
}) => {
  const gridSize = 21;
  const seedStr = value || 'PL-SKINCARE-BRAND-QR';

  const isFinderModule = (r: number, c: number, topR: number, leftC: number) => {
    const dr = r - topR;
    const dc = c - leftC;
    if (dr < 0 || dr > 6 || dc < 0 || dc > 6) return null;
    if (dr === 0 || dr === 6 || dc === 0 || dc === 6) return true;
    if (dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4) return true;
    return false;
  };

  const getModule = (r: number, c: number): boolean => {
    const f1 = isFinderModule(r, c, 0, 0);
    if (f1 !== null) return f1;
    const f2 = isFinderModule(r, c, 0, gridSize - 7);
    if (f2 !== null) return f2;
    const f3 = isFinderModule(r, c, gridSize - 7, 0);
    if (f3 !== null) return f3;

    // Quiet separator around finders
    if (
      (r === 7 && (c <= 7 || c >= gridSize - 8)) ||
      (c === 7 && (r <= 7 || r >= gridSize - 8)) ||
      (r === gridSize - 8 && c <= 7) ||
      (c === gridSize - 8 && r <= 7)
    ) {
      return false;
    }

    // Timing patterns
    if (r === 6) return c % 2 === 0;
    if (c === 6) return r % 2 === 0;

    // Deterministic hash from value + coordinates
    let h = 2166136261;
    const combined = `${seedStr}:${r}:${c}`;
    for (let i = 0; i < combined.length; i++) {
      h ^= combined.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return (h >>> 0) % 100 < 48;
  };

  return (
    <div className="inline-flex flex-col items-center p-3 bg-white border border-zinc-300 rounded-xl">
      {customImageUrl && customImageUrl.startsWith('data:image/') ? (
        <img
          src={customImageUrl}
          alt={label || 'Bank QR Code'}
          referrerPolicy="no-referrer"
          style={{ width: size, height: size }}
          className="object-contain rounded-md border border-zinc-200"
        />
      ) : (
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${gridSize} ${gridSize}`}
          shapeRendering="crispEdges"
          role="img"
          aria-label={label || 'QR Code'}
          className="rounded-sm"
        >
          <rect width={gridSize} height={gridSize} fill="#FFFFFF" />
          {Array.from({ length: gridSize }).map((_, r) =>
            Array.from({ length: gridSize }).map((__, c) =>
              getModule(r, c) ? (
                <rect
                  key={`${r}-${c}`}
                  x={c}
                  y={r}
                  width={1}
                  height={1}
                  fill="#18181B"
                />
              ) : null
            )
          )}
        </svg>
      )}
      {label && (
        <p className="mt-2 text-[11px] font-bold text-zinc-900 font-mono text-center">
          {label}
        </p>
      )}
      {sublabel && (
        <p className="text-[10px] text-zinc-500 font-mono text-center break-all max-w-[170px]">
          {sublabel}
        </p>
      )}
    </div>
  );
};
