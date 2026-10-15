import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageTitle } from "@/components/PageTitle";
import { CallOptions, DEFAULT_OPTS } from "@/components/CallOptions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/_espace/parametres")({
  head: () => ({
    meta: [
      { title: "Paramètres — Serva Call" },
      { name: "description", content: "Profil, préférences d'appel et notifications." },
      { property: "og:title", content: "Paramètres — Serva Call" },
      { property: "og:description", content: "Réglages Serva Call." },
    ],
  }),
  component: SettingsPage,
});

function Toggle({ label, def = true }: { label: string; def?: boolean }) {
  return <label className="flex items-center justify-between rounded-lg border p-3 text-sm">{label}<Switch defaultChecked={def} /></label>;
}

function SettingsPage() {
  const [opts, setOpts] = useState(DEFAULT_OPTS);
  const save = () => toast.success("Paramètres enregistrés");
  return (
    <>
      <PageTitle title="Paramètres" />
      <Tabs defaultValue="calls">
        <TabsList className="flex-wrap">
          <TabsTrigger value="calls">Appels</TabsTrigger>
          <TabsTrigger value="voice">Voix & messages</TabsTrigger>
          <TabsTrigger value="notif">Notifications</TabsTrigger>
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
        </TabsList>
        <div className="mt-6 rounded-2xl border bg-card p-6">
          <TabsContent value="calls" className="space-y-5">
            <p className="text-sm text-muted-foreground">Valeurs par défaut appliquées à chaque nouvel appel.</p>
            <CallOptions value={opts} onChange={setOpts} />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label>Plage horaire d'appel autorisée</Label>
                <div className="flex gap-2"><Input type="time" defaultValue="08:00" /><Input type="time" defaultValue="21:00" /></div></div>
              <div className="space-y-2"><Label>Alerte solde bas (€)</Label><Input type="number" defaultValue={5} /></div>
              <Toggle label="Confirmer avant chaque appel" />
              <Toggle label="Annulation d'écho / réduction de bruit" />
            </div>
          </TabsContent>
          <TabsContent value="voice" className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2"><Label>Langue de synthèse vocale</Label>
              <Select defaultValue="fr-FR"><SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="fr-FR">Français (France)</SelectItem><SelectItem value="fr-CA">Français (Canada)</SelectItem><SelectItem value="en-US">Anglais</SelectItem><SelectItem value="ar">Arabe</SelectItem></SelectContent></Select></div>
            <div className="space-y-2"><Label>Voix</Label>
              <Select defaultValue="female"><SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="female">Féminine</SelectItem><SelectItem value="male">Masculine</SelectItem></SelectContent></Select></div>
            <div className="space-y-2"><Label>Message d'introduction</Label><Input defaultValue="Vous avez un message de" /></div>
            <div className="space-y-2"><Label>Pause avant lecture (ms)</Label><Input type="number" defaultValue={500} /></div>
            <Toggle label="Laisser le message sur répondeur si détecté" />
            <Toggle label="Proposer « Appuyez sur 1 pour réécouter »" />
            <Toggle label="Accusé de lecture (écouté / non écouté)" />
          </TabsContent>
          <TabsContent value="notif" className="grid gap-3 sm:grid-cols-2">
            <Toggle label="Appel terminé" /><Toggle label="Appel échoué ou manqué" />
            <Toggle label="Message vocal délivré" /><Toggle label="Recharge confirmée" />
            <Toggle label="Solde bas" /><Toggle label="Offres et promotions" def={false} />
            <Toggle label="Notifications par e-mail" /><Toggle label="Notifications par SMS" def={false} />
          </TabsContent>
          <TabsContent value="profile" className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label>Prénom</Label><Input defaultValue="Aïcha" /></div>
            <div className="space-y-2"><Label>Nom</Label><Input defaultValue="Diallo" /></div>
            <div className="space-y-2"><Label>E-mail</Label><Input defaultValue="aicha@example.com" /></div>
            <div className="space-y-2"><Label>Téléphone vérifié</Label><Input defaultValue="+33 6 12 34 56 78" disabled /></div>
          </TabsContent>
          <TabsContent value="security" className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label>Nouveau mot de passe</Label><Input type="password" /></div>
            <div className="space-y-2"><Label>Confirmer</Label><Input type="password" /></div>
            <Toggle label="Code PIN avant chaque appel" def={false} />
            <Toggle label="Double authentification par SMS" />
          </TabsContent>
          <Button className="mt-6" onClick={save}>Enregistrer</Button>
        </div>
      </Tabs>
    </>
  );
}
