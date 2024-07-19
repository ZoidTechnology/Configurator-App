import {Theme} from 'src/utils/themes';

export default function (props: {theme: Theme}) {
  return (
    <svg
      viewBox="0 0 64 55.43"
      xmlns="http://www.w3.org/2000/svg"
      width="240px"
    >
      <defs>
        <clipPath id="code7-loader-clip">
          <path d="m0 7.235 4.177-7.235h55.65l4.177 7.235h-55.65l12.53 21.71h13.87l-11.11 19.25z" />
          <path d="m36.18 55.43h-8.355l19.47-33.72h-22.23l-4.177-7.235h38.94z" />
        </clipPath>
        <linearGradient
          id="code7-loader-shimmer"
          gradientTransform="rotate(30)"
        >
          <stop offset="0%" stopColor="#ffffff00" />
          <stop offset="50%" stopColor="#ffffff80" />
          <stop offset="100%" stopColor="#ffffff00" />
          <animateTransform
            attributeName="gradientTransform"
            type="translate"
            from="-1 0"
            to="1 0"
            dur="2s"
            additive="sum"
            repeatCount="indefinite"
          />
        </linearGradient>
      </defs>
      <g clipPath="url(#code7-loader-clip)">
        <rect width="100%" height="100%" fill="var(--color_accent)" />
        <rect width="100%" height="100%" fill="url(#code7-loader-shimmer)" />
      </g>
    </svg>
  );
}
