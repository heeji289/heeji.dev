type Props = {
  className?: string;
};

// favicon(src/app/icon.svg)과 동일한 터미널 `>_` 마크
export default function Logo({ className }: Props) {
  return (
    <svg
      viewBox='0 0 32 32'
      className={className}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
    >
      <rect width='32' height='32' rx='8' fill='#0f172a' />
      <g
        fill='none'
        stroke='#38bdf8'
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <polyline points='11,11 16,16 11,21' />
        <line x1='17.5' y1='21.5' x2='24' y2='21.5' />
      </g>
    </svg>
  );
}
