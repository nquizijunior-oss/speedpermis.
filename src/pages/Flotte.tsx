import { CarFrontIcon, WrenchIcon } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { CategoryBadge } from '../components/ui/CategoryBadge';
import { moniteurs } from '../data/moniteurs';

const toneStatut = (statut: string) =>
statut === 'Disponible' ? 'success' : statut === 'En leçon' ? 'info' : 'neutral';

export function Flotte() {
  const heures = moniteurs.reduce((s, m) => s + m.heuresSemaine, 0);
  const capacite = moniteurs.reduce((s, m) => s + m.capaciteSemaine, 0);

  return (
    <>
      <PageHeader
        title="Moniteurs & flotte"
        description={`${moniteurs.length} moniteurs · ${heures} h planifiées sur ${capacite} h disponibles cette semaine`} />
      

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {moniteurs.map((m) => {
          const charge = Math.round(m.heuresSemaine / m.capaciteSemaine * 100);
          return (
            <Card key={m.id} className="flex flex-col p-6">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-navy-800 text-sm font-bold text-white">
                  {m.initiales}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-base font-semibold text-ink-900">{m.nom}</h2>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="text-sm text-ink-500">Catégories</span>
                    {m.categories.map((category) => <CategoryBadge key={category} category={category} />)}
                  </div>
                </div>
                <Badge tone={toneStatut(m.statut)}>{m.statut}</Badge>
              </div>

              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex items-start gap-2 text-ink-700">
                  <CarFrontIcon className="mt-0.5 h-4 w-4 shrink-0 text-ink-400" aria-hidden="true" />
                  <dt className="sr-only">Véhicule</dt>
                  <dd>
                    {m.vehicule}
                    <span className="ml-2 rounded bg-canvas px-1.5 py-0.5 text-xs font-semibold tabular-nums text-ink-800">
                      {m.immatriculation}
                    </span>
                  </dd>
                </div>
                <div className="flex items-center gap-2 text-ink-700">
                  <WrenchIcon className="h-4 w-4 shrink-0 text-ink-400" aria-hidden="true" />
                  <dt className="sr-only">Prochain contrôle technique</dt>
                  <dd>Prochain contrôle technique : {m.prochainControle}</dd>
                </div>
              </dl>

              <div className="mt-auto grid grid-cols-2 gap-6 pt-6">
                <div>
                  <p className="text-xs text-ink-500">Charge hebdomadaire</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-line">
                      <div className="h-full rounded-full bg-brand-600" style={{ width: `${charge}%` }} />
                    </div>
                    <span className="text-sm font-semibold tabular-nums text-ink-900">
                      {m.heuresSemaine} h
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-ink-500">Taux de réussite</p>
                  <p className="mt-1 text-xl font-bold tabular-nums text-ink-900">{m.tauxReussite} %</p>
                </div>
              </div>
            </Card>);

        })}
      </div>

      <Card className="mt-6">
        <CardHeader title="Rappels d’entretien" description="Échéances véhicules des 90 prochains jours" />
        <ul className="divide-y divide-line">
          {moniteurs.map((m) =>
          <li key={m.id} className="flex flex-wrap items-center gap-4 px-6 py-4">
              <span className="min-w-[220px] flex-1 text-sm font-medium text-ink-900">{m.vehicule}</span>
              <span className="text-sm tabular-nums text-ink-700">{m.immatriculation}</span>
              <span className="text-sm text-ink-500">Contrôle le {m.prochainControle}</span>
            </li>
          )}
        </ul>
      </Card>
    </>);

}