import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLinkIcon } from 'lucide-react';

interface ConnectBlockProps {
  title: string;
  subtitle: string;
}

export function ConnectBlock({ title, subtitle }: ConnectBlockProps) {
  return (
    <div className="flex h-full flex-col py-8 text-center">
      <h3 className="font-display text-[28px] font-bold leading-tight text-ink sm:text-[32px]">
        {title}
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-muted">{subtitle}</p>
      <div className="mt-auto flex justify-center pt-6">
        <Link
          to="/connexion"
          className="inline-flex items-center gap-3 border border-rule bg-white px-10 py-4 font-display text-[13px] font-bold tracking-wide text-ink underline decoration-1 underline-offset-4 shadow-[6px_6px_0_rgba(0,0,0,0.08)] transition-[transform,box-shadow,color] duration-150 ease-out hover:-translate-y-0.5 hover:text-gov-blue hover:shadow-[8px_8px_0_rgba(0,0,0,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-blue focus-visible:ring-offset-2">
          
          JE ME CONNECTE
          <ExternalLinkIcon className="h-4 w-4 text-gov-blue" aria-hidden="true" />
        </Link>
      </div>
    </div>);

}