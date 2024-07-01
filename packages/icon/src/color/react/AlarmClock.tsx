import * as React from 'react';
import type { SVGProps } from 'react';

const SvgAlarmClock = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
    data-slot="icon"
    viewBox="0 0 48 48"
    {...props}
  >
    <path
      fill="#37474F"
      d="m38.5 44.6-4-4 2.1-2.1 4 4c.6.6.6 1.5 0 2.1-.5.5-1.5.5-2.1 0m-29 0 4-4-2.1-2.1-4 4c-.6.6-.6 1.5 0 2.1.5.5 1.5.5 2.1 0"
    />
    <circle cx={24} cy={24} r={20} fill="#C62828" />
    <circle cx={24} cy={24} r={16} fill="#eee" />
    <path fill="#E53935" d="m15.096 33.48-.566-.566 9.191-9.191.566.565z" />
    <path d="M23 11h2v13h-2z" />
    <path d="M31.285 29.654 29.66 31.28l-6.504-6.504 1.626-1.627z" />
    <circle cx={24} cy={24} r={2} />
    <circle cx={24} cy={24} r={1} fill="#C62828" />
    <path
      fill="#37474F"
      d="M22 1h4v3h-4zm22.4 15.2c2.5-3.5 2.1-8.4-1-11.5s-8-3.5-11.5-1zm-40.8 0c-2.5-3.5-2.1-8.4 1-11.5s8-3.5 11.5-1z"
    />
  </svg>
);
export default SvgAlarmClock;
