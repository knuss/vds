import React from 'react';

type Props = {
  type: string;
  className?: string;
};

export default function BodyTypeIcon({ type, className = '' }: Props) {
  const common = { className, width: 24, height: 24, viewBox: '0 0 24 24', xmlns: 'http://www.w3.org/2000/svg', 'aria-hidden': true } as any;

  switch (type) {
    case 'SUV':
      return (
        <svg {...common}>
          <rect x="2" y="7" width="15" height="5" rx="1" fill="currentColor" />
          <rect x="6" y="4" width="7" height="3" rx="1" fill="currentColor" />
          <circle cx="6.5" cy="17" r="1.6" fill="currentColor" />
          <circle cx="13.5" cy="17" r="1.6" fill="currentColor" />
        </svg>
      );

    case 'Sedan':
      return (
        <svg {...common}>
          <path d="M2 12h14l3 3v2H2v-5z" fill="currentColor" />
          <path d="M5 9h6l2 3H5V9z" fill="currentColor" />
          <circle cx="6" cy="17" r="1.6" fill="currentColor" />
          <circle cx="14" cy="17" r="1.6" fill="currentColor" />
        </svg>
      );

    case 'Hatchback':
      return (
        <svg {...common}>
          <path d="M2 12h10l3 3v2H2v-5z" fill="currentColor" />
          <path d="M9 8h4l2 2H7l2-2z" fill="currentColor" />
          <circle cx="6" cy="17" r="1.6" fill="currentColor" />
          <circle cx="13.5" cy="17" r="1.6" fill="currentColor" />
        </svg>
      );

    case 'Ute':
      return (
        <svg {...common}>
          <path d="M2 12h9v-2l3 0v5H2v-3z" fill="currentColor" />
          <rect x="11" y="12" width="7" height="3" fill="currentColor" />
          <circle cx="5" cy="17" r="1.6" fill="currentColor" />
          <circle cx="14.5" cy="17" r="1.6" fill="currentColor" />
        </svg>
      );

    case 'Van':
      return (
        <svg {...common}>
          <rect x="2" y="6" width="16" height="8" rx="1" fill="currentColor" />
          <rect x="18" y="9" width="3" height="5" fill="currentColor" />
          <circle cx="6" cy="17" r="1.6" fill="currentColor" />
          <circle cx="14.5" cy="17" r="1.6" fill="currentColor" />
        </svg>
      );

    case 'Wagon':
      return (
        <svg {...common}>
          <path d="M2 11h11l3 3v2H2v-5z" fill="currentColor" />
          <rect x="5" y="7" width="8" height="3" rx="1" fill="currentColor" />
          <circle cx="6" cy="17" r="1.6" fill="currentColor" />
          <circle cx="13.5" cy="17" r="1.6" fill="currentColor" />
        </svg>
      );

    case 'Coupe':
      return (
        <svg {...common}>
          <path d="M2 13h12l2-3s0-3-5-3H6l-4 3v3z" fill="currentColor" />
          <circle cx="6" cy="17" r="1.6" fill="currentColor" />
          <circle cx="13.5" cy="17" r="1.6" fill="currentColor" />
        </svg>
      );

    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" fill="currentColor" />
        </svg>
      );
  }
}
