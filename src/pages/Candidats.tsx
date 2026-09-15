import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, SearchIcon, UsersIcon } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { CategoryBadge } from '../components/ui/CategoryBadge';
import { NewCandidatModal } from '../components/modals/NewCandidatModal';
import { useAppContext } from '../hooks/useAppContext';
import { StatutCandidat } from '../types';

const filtres: Array<StatutCandidat | 'Tous'> = ['Tous', 'Actif', 'En attente', 'Terminé', 'Suspendu'];

const toneStatut: Record<StatutCandidat, 'success' | 'warning' | 'info' | 'danger'> = {
  Actif: 'info',
  'En attente': 'warning',
  Terminé: 'success',
  Suspendu: 'danger'
};

export function Candidats() {
  const { candidats } = useAppContext();
  const [query, setQuery] = useState('');
  const [statut, setStatut] = useState<StatutCandidat | 'Tous'>('Tous');
  const [modalOpen, setModalOpen] = useState(false);

  const liste = useMemo(
    () =>
    candidats.filter((c) => {
      const matchQuery = `${c.prenom} ${c.nom} ${c.neph} ${c.email}`.
      toLowerCase().
      includes(query.trim().toLowerCase());
      const matchStatut = statut === 'Tous' || c.statut === statut;
      return matchQuery && matchStatut;
    }),
    [candidats, query, statut]
  );

  return (
    <>
      <PageHeader
        title="Candidats"
        description={`${candidats.length} dossiers suivis par l’auto-école`}
        action={
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-700">
          
            <PlusIcon className="h-4 w-4" aria-hidden="true" />
            Nouveau candidat
          </button>
        } />
      

      <NewCandidatModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <Card>
        <div className="flex flex-wrap items-center gap-3 border-b border-line px-6 py-4">
          <div className="relative min-w-[240px] flex-1">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nom, e-mail ou n° NEPH"
              aria-label="Filtrer les candidats"
              className="h-10 w-full rounded-lg border border-line bg-canvas pl-9 pr-3 text-sm text-ink-900 placeholder:text-ink-400 transition-colors duration-150 focus:border-brand-600 focus:bg-white focus:outline-none" />
            
          </div>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filtrer par statut">
            {filtres.map((f) =>
            <button
              key={f}
              type="button"
              onClick={() => setStatut(f)}
              aria-pressed={statut === f}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 ${
              statut === f ?
              'bg-navy-800 text-white' :
              'bg-canvas text-ink-700 hover:bg-brand-50 hover:text-brand-700'}`
              }>
              
                {f}
              </button>
            )}
          </div>
        </div>

        {liste.length === 0 ?
        <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-canvas text-ink-400">
              <UsersIcon className="h-6 w-6" aria-hidden="true" />
            </span>
            <p className="text-sm font-semibold text-ink-900">Aucun candidat ne correspond</p>
            <p className="max-w-sm text-sm text-ink-500">
              Modifiez votre recherche ou réinitialisez les filtres pour retrouver un dossier.
            </p>
          </div> :

        <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-wide text-ink-500">
                  <th scope="col" className="px-6 py-3 font-semibold">Candidat</th>
                  <th scope="col" className="px-6 py-3 font-semibold">N° NEPH</th>
                  <th scope="col" className="px-6 py-3 font-semibold">Cat.</th>
                  <th scope="col" className="px-6 py-3 font-semibold">Progression</th>
                  <th scope="col" className="px-6 py-3 font-semibold">Moniteur</th>
                  <th scope="col" className="px-6 py-3 font-semibold">Solde dû</th>
                  <th scope="col" className="px-6 py-3 font-semibold">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {liste.map((c) =>
              <tr key={c.id} className="transition-colors duration-150 hover:bg-canvas">
                    <td className="px-6 py-4">
                      <Link to={`/candidats/${c.id}`} className="flex items-center gap-3 group">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-50 text-xs font-bold text-brand-700">
                          {c.initiales}
                        </span>
                        <span>
                          <span className="block font-semibold text-ink-900 transition-colors duration-150 group-hover:text-brand-600">
                            {c.prenom} {c.nom.toUpperCase()}
                          </span>
                          <span className="block text-xs text-ink-500">{c.email}</span>
                        </span>
                      </Link>
                    </td>
                    <td className="px-6 py-4 tabular-nums text-ink-700">{c.neph}</td>
                    <td className="px-6 py-4">
                      <CategoryBadge category={c.categorie} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-line">
                          <div
                        className="h-full rounded-full bg-brand-600"
                        style={{ width: `${Math.round(c.heuresEffectuees / c.heuresPrevues * 100)}%` }} />
                      
                        </div>
                        <span className="text-xs tabular-nums text-ink-500">
                          {c.heuresEffectuees}/{c.heuresPrevues} h
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-ink-700">{c.moniteur}</td>
                    <td className="px-6 py-4 tabular-nums font-medium text-ink-900">
                      {c.soldeDu === 0 ? <span className="text-ink-400">—</span> : `${c.soldeDu} €`}
                    </td>
                    <td className="px-6 py-4">
                      <Badge tone={toneStatut[c.statut]}>{c.statut}</Badge>
                    </td>
                  </tr>
              )}
              </tbody>
            </table>
          </div>
        }
      </Card>
    </>);

}