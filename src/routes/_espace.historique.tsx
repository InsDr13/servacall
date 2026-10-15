import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { useState } from "react";
import { PageTitle } from "@/components/PageTitle";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CALLS, euro, formatDuration } from "@/lib/mock";

export const Route = createFileRoute("/_espace/historique")({
  head: () => ({
    meta: [
      { title: "Historique des appels — Serva Call" },
      { name: "description", content: "Tous vos appels et messages vocaux." },
      { property: "og:title", content: "Historique — Serva Call" },
      { property: "og:description", content: "Historique des appels." },
    ],
  }),
  component: HistoryPage,
});

const tone: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  terminé: "default", manqué: "outline", échoué: "destructive", répondeur: "secondary",
};

function HistoryPage() {
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");
  const list = CALLS.filter((c) => (filter === "all" || c.type === filter) && `${c.name} ${c.phone}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <PageTitle title="Historique" subtitle="Appels et messages vocaux envoyés." />
      <div className="mb-4 flex flex-wrap gap-3">
        <Tabs value={filter} onValueChange={setFilter}>
          <TabsList><TabsTrigger value="all">Tout</TabsTrigger><TabsTrigger value="appel">Appels</TabsTrigger><TabsTrigger value="message vocal">Vocaux</TabsTrigger><TabsTrigger value="message texte">Textes</TabsTrigger></TabsList>
        </Tabs>
        <Input placeholder="Rechercher…" value={q} onChange={(e) => setQ(e.target.value)} className="max-w-xs" />
      </div>
      <div className="divide-y rounded-2xl border bg-card">
        {list.map((c) => (
          <div key={c.id} className="flex items-center gap-4 p-4">
            <div className="flex-1">
              <p className="font-medium">{c.name ?? c.phone}</p>
              <p className="text-sm text-muted-foreground">{c.phone} · {new Date(c.date).toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" })}</p>
            </div>
            <Badge variant={tone[c.status]}>{c.status}</Badge>
            <div className="hidden w-28 text-right text-sm sm:block">
              <p>{formatDuration(c.duration)}</p><p className="text-muted-foreground">{euro(c.cost)}</p>
            </div>
            <Link to="/appel" search={{ to: c.phone }} className="grid size-9 place-items-center rounded-full bg-secondary text-primary"><Phone className="size-4" /></Link>
          </div>
        ))}
        {!list.length && <p className="p-8 text-center text-muted-foreground">Aucun résultat</p>}
      </div>
    </>
  );
}
