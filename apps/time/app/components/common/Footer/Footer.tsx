import Link from 'next/link';
import React from 'react';
import { PATH } from '@constants/path';

const links = [
  {
    name: '이용약관',
    path: PATH.TERMS,
  },
  {
    name: '개인정보처리방침',
    path: PATH.PRIVACY,
  },
  {
    name: '동아리운영규칙',
    path: PATH.RULES,
  },
] as const;

const Footer = () => {
  return (
    <footer className="p-10 text-center bg-white border-t">
      <ul className="flex justify-center text-sm divide-x">
        {links.map(({ name, path }) => (
          <Link key={name} href={path} className="px-2">
            {name}
          </Link>
        ))}
      </ul>
      <div className="mt-2 text-xs font-medium text-gray-400">
        <p className="space-x-1">
          <span>Developed By</span>
          <a href="https://github.com/KGU-C-Lab" target="_blank">
            C-Lab CoreTeam
          </a>
          <span>X</span>
          <a href="https://jinhy.uk" target="_blank">
            방진혁
          </a>
        </p>
        <p>© C-Lab. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
