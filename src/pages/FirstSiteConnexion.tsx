import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckIcon, Loader2Icon } from 'lucide-react';
import { MarianneLogo } from '../first-site-components/MarianneLogo';

type Status = 'idle' | 'pending';

export function Connexion() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [captchaLoaded, setCaptchaLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setCaptchaLoaded(true), 700);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('pending');
    window.setTimeout(() => { setStatus('idle'); navigate('/speedpermis/connexion'); }, 700);
  };

  return (
    <div className="flex min-h-full w-full flex-col bg-white font-sans text-ink">
      <header className="w-full px-6 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-blue focus-visible:ring-offset-2">
          
          <MarianneLogo className="scale-[0.7] origin-left" />
          <span aria-hidden="true" className="font-display text-[8px] font-bold leading-[1.1] tracking-tight text-ink">
            <span className="block">SÉCURITÉ</span>
            <span className="block">
              ROUTIÈRE <span className="bg-gov-yellow px-0.5">VIVRE,</span>
            </span>
            <span className="block">
              <span className="bg-gov-yellow px-0.5">ENSEMBLE</span>
            </span>
          </span>
          <span className="text-[17px] text-ink">
            <span className="font-semibold text-gov-blue">permisdeconduire</span>.gouv.fr
          </span>
        </Link>
      </header>

      <main className="w-full px-5 pb-24">
        <h1 className="mt-6 text-center font-display text-[26px] font-semibold text-[#12326b] sm:text-[28px]">
          Bienvenue sur RdvPermis
        </h1>

        <section className="mx-auto mt-10 w-full max-w-2xl rounded-lg border border-neutral-200 bg-white px-8 py-10 shadow-sm sm:px-14">
          <h2 className="text-center font-display text-[22px] font-semibold text-[#12326b]">
            J’ai un compte, je me connecte
          </h2>

          <form className="mt-10" onSubmit={handleSubmit}>
            <label
              htmlFor="email"
              className="block font-display text-[13px] font-bold tracking-wide text-[#3a5a86]">
              
              ADRESSE E-MAIL{' '}
              <span className="ml-2 font-sans text-[14px] font-normal tracking-normal text-muted">
                (nom@exemple.com)
              </span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 h-12 w-full rounded border border-neutral-300 px-3 text-[15px] text-ink outline-none transition-colors duration-150 ease-out focus:border-gov-blue focus:ring-1 focus:ring-gov-blue" />
            

            <label
              htmlFor="password"
              className="mt-6 block font-display text-[13px] font-bold tracking-wide text-[#3a5a86]">
              
              MOT DE PASSE
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 h-12 w-full rounded border border-neutral-300 px-3 text-[15px] text-ink outline-none transition-colors duration-150 ease-out focus:border-gov-blue focus:ring-1 focus:ring-gov-blue" />
            

            <label className="mt-4 flex items-center gap-2 text-[15px] text-ink">
              <input
                type="checkbox"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
                className="h-4 w-4 rounded-sm border-neutral-400 text-gov-blue focus:ring-gov-blue" />
              
              Se souvenir de moi
            </label>

            <div
              aria-live="polite"
              className="mx-auto mt-8 flex max-w-sm items-center gap-4 rounded border border-neutral-200 bg-white px-4 py-5 shadow-sm">
              {captchaLoaded ?
              <>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1c9c4b]">
                  <CheckIcon className="h-5 w-5 text-white" strokeWidth={3} aria-hidden="true" />
                </span>
                <span className="text-[16px] text-ink">Success!</span>
              </> :
              <>
                <Loader2Icon className="h-5 w-5 animate-spin text-gov-blue" aria-hidden="true" />
                <span className="text-[16px] text-ink">Chargement de la vérification...</span>
              </>}
            </div>

            <div className="mt-10 flex justify-center">
              <button
                type="submit"
                disabled={status === 'pending'}
                className="inline-flex items-center gap-2 px-4 py-2 font-display text-[14px] font-bold tracking-wide text-ink transition-colors duration-150 ease-out hover:text-gov-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-blue focus-visible:ring-offset-2 disabled:opacity-60">
                
                {status === 'pending' &&
                <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" />
                }
                JE ME CONNECTE
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>);

}

export { Connexion as FirstSiteConnexion };