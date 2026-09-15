import React, { useState } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader } from '../components/ui/Card';

const preferences = [
{
  id: 'notif-resultats',
  titre: 'Résultats d’examen',
  detail: 'Recevoir une alerte dès la publication d’un résultat par le centre.',
  defaut: true
},
{
  id: 'notif-places',
  titre: 'Places d’examen disponibles',
  detail: 'Être informé des créneaux libérés dans vos centres de rattachement.',
  defaut: true
},
{
  id: 'notif-impayes',
  titre: 'Relances d’impayés',
  detail: 'Envoyer automatiquement une relance 5 jours après l’échéance.',
  defaut: false
},
{
  id: 'notif-docs',
  titre: 'Pièces refusées par l’ANTS',
  detail: 'Notifier le candidat et le moniteur référent en cas de refus.',
  defaut: true
}];


function Toggle({ id, checked, onChange, label }: {id: string;checked: boolean;onChange: () => void;label: string;}) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-150 ${
      checked ? 'bg-brand-600' : 'bg-ink-400/40'}`
      }>
      
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-150 ease-out ${
        checked ? 'translate-x-[22px]' : 'translate-x-0.5'}`
        } />
      
    </button>);

}

export function Parametres() {
  const [etats, setEtats] = useState<Record<string, boolean>>(
    Object.fromEntries(preferences.map((p) => [p.id, p.defaut]))
  );
  const [enregistre, setEnregistre] = useState(false);

  const handleToggle = (id: string) => {
    setEtats(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = () => {
    localStorage.setItem('preferences', JSON.stringify(etats));
    setEnregistre(true);
    setTimeout(() => setEnregistre(false), 2000);
  };

  return (
    <>
      <PageHeader title="Paramètres" description="Établissement, agrément et préférences de notification" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Établissement" description="Informations déclarées auprès de la préfecture" />
          <dl className="divide-y divide-line">
            {[
            { t: 'Raison sociale', v: 'Auto-école SPEED PERMIS' },
            { t: 'N° d’agrément', v: 'E 21 013 0045 0' },
            { t: 'SIRET', v: '812 456 998 00027' },
            { t: 'Adresse', v: '48 avenue de la Capelette, 13010 Marseille' },
            { t: 'Téléphone', v: '04 91 33 27 84' },
            { t: 'Responsable pédagogique', v: 'Karim Belhaj' }].
            map((row) =>
            <div key={row.t} className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
                <dt className="text-sm text-ink-500">{row.t}</dt>
                <dd className="text-sm font-semibold text-ink-900">{row.v}</dd>
              </div>
            )}
          </dl>
        </Card>

        <Card className="flex flex-col">
          <CardHeader title="Notifications" description="Alertes envoyées à votre équipe" />
          <ul className="divide-y divide-line">
            {preferences.map((p) =>
            <li key={p.id} className="flex items-start gap-4 px-6 py-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink-900">{p.titre}</p>
                  <p className="mt-0.5 text-sm text-ink-500">{p.detail}</p>
                </div>
                <Toggle
                id={p.id}
                label={p.titre}
                checked={etats[p.id]}
                onChange={() => handleToggle(p.id)} />
              
              </li>
            )}
          </ul>
          <div className="mt-auto flex items-center gap-4 border-t border-line px-6 py-4">
            <button
              type="button"
              onClick={handleSave}
              className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-700">
              
              Enregistrer les préférences
            </button>
            {enregistre &&
            <p role="status" className="text-sm font-medium text-ok-600">
                Préférences enregistrées.
              </p>
            }
          </div>
        </Card>
      </div>
    </>);

}