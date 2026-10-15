import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/PageTitle";
import { Badge } from "@/components/ui/badge";
import { LOGS } from "@/lib/mock";

export const Route = createFileRoute("/_espace/journal")({
  head: () => ({
    meta: [
      { title: "Journal des événements — Serva Call" },
      { name: "description", content: "Journal technique de vos appels." },
      { property: "og:title", content: "Journal — Serva Call" },
      { property: "og:description", content: "Événements d'appels." },
    ],
  }),
  component: LogsPage,
});

function LogsPage() {
  return (
    <>
      <PageTitle title="Journal" subtitle="Événements détaillés de vos appels (statuts, erreurs, détections)." />
      <div className="overflow-hidden rounded-2xl border bg-card font-mono text-sm">
        {LOGS.map((l, i) => (
          <div key={i} className="flex flex-wrap items-center gap-3 border-b p-3 last:border-none">
            <span className="text-muted-foreground">{l.t}</span>
            <Badge variant={l.level === "error" ? "destructive" : l.level === "warn" ? "secondary" : "outline"}>{l.event}</Badge>
            <span className="font-sans">{l.detail}</span>
          </div>
        ))}
      </div>
    </>
  );
}
