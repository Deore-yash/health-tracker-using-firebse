import type { SVGProps } from 'react';

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2a5 5 0 0 0-5 5c0 4.23 5 11 5 11s5-6.77 5-11a5 5 0 0 0-5-5z" />
      <path d="M12 21a9 9 0 0 0 0-18" />
    </svg>
  ),
};
