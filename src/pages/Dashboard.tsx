import { Link } from 'react-router-dom';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import {
  AlertTriangleIcon,
  ArrowRightIcon,
  CalendarDaysIcon,
  ClockIcon,
  FileWarningIcon,
  ReceiptEuroIcon,
  TrendingUpIcon,
} from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader } from '../components/ui/Card';
import { ResultBadge } from '../components/ui/ResultBadge';
import { CategoryBadge } from '../components/ui/CategoryBadge';
import { reussiteParMois } from '../data/facturation';
import { useAppContext } from '../hooks/useAppContext';

const alerts = [
  {
    icon: ReceiptEuroIcon,
    titre: '3 factures en retard',
    detail: '1 480 € à recouvrer — relance recommandée',
    to: '/facturation',
    tone: 'text-danger-600 bg-danger-50',
  },
  {
    icon: FileWarningIcon,
    titre: '3 pièces à vérifier',
    detail: 'Justificatifs déposés en attente de contrôle',
    to: '/documents',
    tone: 'text-warn-700 bg-warn-50',
  },
  {
    icon: AlertTriangleIcon,
    titre: '1 photo e-Photo refusée',
    detail: 'Amine Tazi — nouveau dépôt nécessaire',
    to: '/documents',
    tone: 'text-warn-700 bg-warn-50',
  },
];

export function Dashboard() {
  const { candidats, examens, reservations } = useAppContext();
  const derniers = examens.filter((e) => e.resultat !== 'En attente').slice(0, 4);
  const agenda = reservations.filter((r) => r.jour === 7);

  return (
    <>
          <PageHeader
        title="Bonjour, Auto-école SPEED PERMIS"
        description="Mardi 15 septembre 2026 — synthèse de votre activité"
        action={
          <Link
            to="/reservations"
            className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-sky-600"
          >
            <CalendarDaysIcon className="h-4 w-4" aria-hidden="true" />
            Planifier une session
          </Link>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              <div className="border-b border-line p-6 lg:col-span-3 lg:border-b-0 lg:border-r">
                <div className="flex items-center gap-2 text-sm font-medium text-ink-500">
                  <TrendingUpIcon className="h-4 w-4 text-ok-600" aria-hidden="true" />
                  Taux de réussite — 6 derniers mois
                </div>
                <p className="mt-2 flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold tracking-tight text-ink-900">95 %</span>
                  <span className="text-sm font-semibold text-ok-600">+2 pts vs août</span>
                </p>
                <div className="mt-4 h-28">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={reussiteParMois} margin={{ top: 4, right: 4, bottom: 0, left: -28 }}>
                      <defs>
                        <linearGradient id="reussite" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#1a46c2" stopOpacity={0.18} />
                          <stop offset="100%" stopColor="#1a46c2" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="mois" tickLine={false} axisLine={false} tick={{ fill: '#8d97ac', fontSize: 12 }} />
                      <YAxis domain={[80, 100]} hide />
                      <Tooltip
                        cursor={{ stroke: '#c2d2ff' }}
                        contentStyle={{ borderRadius: 8, border: '1px solid #e3e8f1', fontSize: 12 }}
                        formatter={(v: number) => [`${v} %`, 'Réussite']}
                      />
                      <Area type="monotone" dataKey="taux" stroke="#1a46c2" strokeWidth={2} fill="url(#reussite)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <dl className="grid grid-cols-1 divide-y divide-line lg:col-span-2">
                {[
                  { label: 'Candidats actifs', value: String(candidats.filter((c) => c.statut === 'Actif').length), hint: '+12 ce mois-ci' },
                  { label: 'Examens à venir', value: String(examens.filter((e) => e.resultat === 'En attente').length), hint: '3 sous 7 jours' },
                  { label: 'Examens réalisés', value: String(examens.filter((e) => e.resultat !== 'En attente').length), hint: 'depuis janvier' },
                ].map((m) => (
                  <div key={m.label} className="flex items-baseline justify-between px-6 py-5">
                    <div>
                      <dt className="text-sm text-ink-500">{m.label}</dt>
                      <dd className="mt-1 text-2xl font-bold tracking-tight text-ink-900">{m.value}</dd>
                    </div>
                    <span className="text-xs text-ink-400">{m.hint}</span>
                  </div>
                ))}
              </dl>
            </div>
          </Card>

          <Card>
            <CardHeader
              title="Derniers examens réalisés"
                action={
                <Link to="/examens" className="text-sm font-semibold text-sky-600 transition-colors duration-150 hover:text-sky-700">
                  Voir tous
                </Link>
              }
            />

            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-line text-xs uppercase tracking-wide text-ink-500">
                    <th scope="col" className="px-6 py-3 font-semibold">Candidat</th>
                    <th scope="col" className="px-6 py-3 font-semibold">Catégorie</th>
                    <th scope="col" className="px-6 py-3 font-semibold">Date d’examen</th>
                    <th scope="col" className="px-6 py-3 font-semibold">Centre</th>
                    <th scope="col" className="px-6 py-3 font-semibold">Résultat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {derniers.map((e) => (
                    <tr key={e.id} className="transition-colors duration-150 hover:bg-canvas">
                      <td className="px-6 py-4">
                          <Link to={`/candidats/${e.candidatId}`} className="font-semibold text-ink-900 transition-colors duration-150 hover:text-sky-600">
                          {e.candidat}
                        </Link>
                      </td>
                      <td className="px-6 py-4"><CategoryBadge category={e.categorie} /></td>
                      <td className="px-6 py-4 text-ink-700"><span className="date-value">{e.date}</span></td>
                      <td className="px-6 py-4 text-ink-700">{e.centre}</td>
                      <td className="px-6 py-4">
                        <ResultBadge result={e.resultat} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-line px-6 py-4">
              <Link to="/examens" className="inline-flex items-center gap-2 rounded-lg border border-sky-600 px-4 py-2.5 text-sm font-semibold text-sky-600 transition-colors duration-150 hover:bg-sky-50">
                Voir tous les examens
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader title="Agenda du jour" description="Mardi 15 septembre" />
            <ul className="divide-y divide-line">
              {agenda.map((r) => (
                <li key={r.id} className="flex gap-4 px-6 py-4">
                  <div className="w-16 shrink-0">
                    <p className="text-sm font-bold text-ink-900">{r.debut}</p>
                    <p className="text-xs text-ink-400">{r.fin}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink-900">{r.candidat}</p>
                    <p className="mt-0.5 truncate text-xs text-ink-500">{r.type} · {r.moniteur}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-line px-6 py-4">
              <Link to="/reservations" className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 transition-colors duration-150 hover:text-sky-700">
                <ClockIcon className="h-4 w-4" aria-hidden="true" />
                Ouvrir le planning
              </Link>
            </div>
          </Card>

          <Card>
            <CardHeader title="À traiter" description="Actions en attente de votre équipe" />
            <ul className="divide-y divide-line">
              {alerts.map((a) => {
                const Icon = a.icon;
                return (
                  <li key={a.titre} className="px-6 py-4">
                    <Link to={a.to} className="flex items-start gap-3">
                      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${a.tone}`}>
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-ink-900">{a.titre}</p>
                        <p className="mt-0.5 text-xs text-ink-500">{a.detail}</p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}