import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon, CheckIcon, FileSearchIcon, XIcon } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { CategoryBadge } from '../components/ui/CategoryBadge';
import { getExamen } from '../data/examens';

export function ExamenResultat() {
  const { id = '' } = useParams();
  const examen = getExamen(id);
  const navigate = useNavigate();

  if (!examen) {
    return (
      <Card className="px-6 py-20 text-center">
        <h1 className="text-lg font-semibold text-ink-900">Examen introuvable</h1>
        <Link to="/examens" className="mt-3 inline-block text-sm font-semibold text-brand-600">
          Retour aux examens
        </Link>
      </Card>);

  }

  const favorable = examen.resultat === 'Favorable';

  return (
    <>
      <PageHeader
        title={`Résultat de l’${examen.type.toLowerCase()}`}
        crumbs={[
        { label: 'Examens', to: '/examens' },
        { label: `Dossier ${examen.dossier}` }]
        } />
      

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        className={`flex flex-wrap items-center gap-6 rounded-xl border p-6 sm:p-8 ${
        favorable ? 'border-[#b7fbca] bg-[#f4fef3]' : 'border-[#ffe6e9] bg-[#fff6f7]'}`
        }>
        
        <span
          className={`grid h-16 w-16 shrink-0 place-items-center text-white ${
          favorable ? 'rounded-full bg-[#1b6736]' : 'bg-[#e1000f]'}`}
          style={favorable ? undefined : { clipPath: 'polygon(25% 4%, 75% 4%, 100% 50%, 75% 96%, 25% 96%, 0 50%)' }}
          >
          
          {favorable ?
          <CheckIcon className="h-9 w-9" strokeWidth={3} aria-hidden="true" /> :

          <XIcon className="h-9 w-9" strokeWidth={3} aria-hidden="true" />
          }
        </span>
        <div className="min-w-[220px] flex-1">
          <p className="text-sm font-semibold uppercase tracking-wide text-ink-500">Résultat</p>
          <p
            className={`text-4xl font-extrabold uppercase tracking-tight ${
            favorable ? 'text-[#1b6736]' : 'text-[#e1000f]'}`
            }>
            
            {favorable ? 'Favorable' : 'Éliminatoire'}
          </p>
          <p className="mt-2 text-sm text-ink-700">
            {favorable ?
            'Félicitations ! Le candidat a réussi son examen pratique.' :
            'Le candidat devra se représenter à une prochaine session.'}
          </p>
        </div>
        <p className="text-right">
          <span
            className={`text-5xl font-extrabold tabular-nums ${
            favorable ? 'text-[#1b6736]' : 'text-[#e1000f]'}`
            }>
            
            {examen.points}
          </span>
          <span className="text-2xl font-semibold text-ink-500"> / {examen.total}</span>
          <span className="mt-1 block text-sm text-ink-500">points</span>
        </p>
      </motion.div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {[
        [
        { t: 'Candidat', v: examen.candidat },
        { t: 'Catégorie', v: examen.categorie },
        { t: 'Date de l’examen', v: `${examen.date} à ${examen.heure}` },
        { t: 'Centre d’examen', v: examen.centre }],

        [
        { t: 'Inspecteur', v: examen.inspecteur },
        { t: 'N° d’inspecteur', v: examen.numeroInspecteur },
        { t: 'Date de publication', v: examen.datePublication },
        { t: 'N° de dossier', v: examen.dossier }]].

        map((bloc, i) =>
        <Card key={i} className="p-6">
            <dl className="space-y-5">
              {bloc.map((row) =>
            <div key={row.t}>
                  <dt className="text-sm text-ink-500">{row.t}</dt>
                  <dd className="mt-0.5 font-semibold text-ink-900">{row.t === 'Date de l’examen' || row.t === 'Date de publication' ? <span className="date-value">{row.v}</span> : row.t === 'Catégorie' ? <span className="inline-flex items-center gap-2"><CategoryBadge category={examen.categorie} /> <span>- Voiture</span></span> : row.v}</dd>
                </div>
            )}
            </dl>
          </Card>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          to={`/candidats/${examen.candidatId}`}
          className="flex h-12 flex-1 items-center justify-center rounded-lg border border-brand-600 text-sm font-semibold text-brand-600 transition-colors duration-150 hover:bg-brand-50">
          
          Retour au dossier
        </Link>
        <Link
          to={`/examens/${examen.id}/detail`}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-lg border border-line bg-white text-sm font-semibold text-ink-800 transition-colors duration-150 hover:bg-canvas">
          
          <FileSearchIcon className="h-4 w-4" aria-hidden="true" />
          Détail de l’évaluation
        </Link>
        <button
          type="button"
          onClick={() => navigate(`/examens/${examen.id}/succes`)}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-brand-700 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-600">
          
          <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          Télécharger le CEPC
        </button>
      </div>
    </>);

}