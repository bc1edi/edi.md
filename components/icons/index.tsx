import type { SVGProps } from "react";

/* Set icone brand (public/assets/icons) come componenti.
 * Regola di famiglia: viewBox 24, stroke 2, linecap square, linejoin miter,
 * geometria ortogonale, terminali piatti. */

/** `className` sostituisce la classe di default "icon" (utility 1em). */
type IconProps = SVGProps<SVGSVGElement> & { className?: string };

const STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "square",
  strokeLinejoin: "miter",
} as const;

function makeIcon(paths: React.ReactNode, filled = false) {
  const Icon = ({ className, ...rest }: IconProps) => (
    <svg
      className={className ?? "icon"}
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...(filled ? { fill: "currentColor" } : STROKE)}
      {...rest}
    >
      {paths}
    </svg>
  );
  return Icon;
}

export const ArrowRightIcon = makeIcon(
  <>
    <path d="M4 12h15" />
    <path d="M13 6l6 6-6 6" />
  </>,
);

export const AudioIcon = makeIcon(
  <>
    <path d="M3 9h4l5-5v16l-5-5H3V9z" />
    <path d="M16 9v6" />
    <path d="M20 6v12" />
  </>,
);

export const AudioOffIcon = makeIcon(
  <>
    <path d="M3 9h4l5-5v16l-5-5H3V9z" />
    <path d="M16 9l6 6" />
    <path d="M22 9l-6 6" />
  </>,
);

export const ClockIcon = makeIcon(
  <>
    <rect x="3" y="3" width="18" height="18" />
    <path d="M12 7v5h4" />
  </>,
);

export const GithubIcon = makeIcon(
  <>
    <rect x="4" y="3" width="4" height="4" />
    <rect x="16" y="3" width="4" height="4" />
    <rect x="10" y="16" width="4" height="4" />
    <path d="M6 7v3h12V7" />
    <path d="M12 10v6" />
  </>,
);

export const GridIcon = makeIcon(
  <>
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </>,
);

export const LayersIcon = makeIcon(
  <>
    <rect x="3" y="3" width="13" height="13" />
    <path d="M8 16v5h13V8h-5" />
  </>,
);

export const LinkedinIcon = makeIcon(
  <>
    <path d="M5 4v3" />
    <path d="M5 11v9" />
    <path d="M11 20v-9" />
    <path d="M11 13h5v7" />
  </>,
);

export const MailIcon = makeIcon(
  <>
    <rect x="3" y="5" width="18" height="14" />
    <path d="M3 7l9 6 9-6" />
  </>,
);

export const MarkIcon = makeIcon(
  <>
    <rect x="4" y="4" width="16" height="4" />
    <rect x="4" y="8" width="4" height="12" />
    <rect x="16" y="8" width="4" height="2" />
    <rect x="4" y="10" width="16" height="4" />
    <rect x="4" y="16" width="16" height="4" />
  </>,
  true,
);

export const PinIcon = makeIcon(
  <>
    <rect x="6" y="3" width="12" height="12" />
    <rect x="10" y="7" width="4" height="4" />
    <path d="M12 15v6" />
  </>,
);

export const SendIcon = makeIcon(
  <>
    <path d="M22 2L11 13" />
    <path d="M22 2L15 22l-4-9-9-4z" />
  </>,
);

export const UserIcon = makeIcon(
  <>
    <rect x="9" y="3" width="6" height="6" />
    <path d="M5 21v-4h14v4" />
  </>,
);

export const XIcon = makeIcon(
  <>
    <path d="M5 4l14 16" />
    <path d="M19 4L5 20" />
  </>,
);

export const socialIcons = {
  github: GithubIcon,
  x: XIcon,
  linkedin: LinkedinIcon,
  send: SendIcon,
} as const;
