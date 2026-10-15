import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageSquareText, Phone, Wallet } from "lucide-react";
import { PageTitle } from "@/components/PageTitle";
import { CALLS, CONTACTS, euro, formatDuration } from "@/lib/mock";

export const Route = createFileRoute("/_espace/tableau-de-bord")({
  head: () => ({
    meta: [
      { title: "Tableau de bord — Serva Call" },
      { name: "description", content: "Vue d'ensemble de vos appels et de votre solde." },
      { property: "og:title", content: "Tableau de bord — Serva Call" },
      { property: "og:description", content: "Votre espace Serva Call." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const minutes = Math.round(CALLS.reduce((a, c) => a + c.duration, 0) / 60);
  return (
    <>
      <PageTitle title="Bonjour 👋" subtitle="Qui voulez-vous joindre aujourd'hui ?" />
      <div className="grid gap-4 sm:grid-cols-3">
        <Link to="/appel" className="rounded-2xl bg-hero p-6 text-sidebar-foreground shadow-soft">
          <Phone className="size-7 text-accent" /><p className="mt-6 text-lg font-semibold">Passer un appel</p>
        </Link>
        <Link to="/message" className="rounded-2xl border bg-card p-6 shadow-soft">
          <MessageSquareText className="size-7 text-primary" /><p className="mt-6 text-lg font-semibold">Message vocal</p>
        </Link>
        <Link to="/solde" className="rounded-2xl border bg-card p-6 shadow-soft">
          <Wallet className="size-7 text-primary" /><p className="mt-6 text-lg font-semibold">{euro(12.4)}</p>
          <p className="text-sm text-muted-foreground">{minutes} min utilisées ce mois</p>
        </Link>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border bg-card p-6">
          <h2 className="mb-4 font-semibold">Favoris</h2>
          <div className="space-y-3">
            {CONTACTS.filter((c) => c.favorite).map((c) => (
              <Link key={c.id} to="/appel" search={{ to: c.phone }} className="flex items-center justify-between rounded-lg p-2 hover:bg-muted">
                <span><span className="font-medium">{c.name}</span><br /><span className="text-sm text-muted-foreground">{c.phone}</span></span>
                <Phone className="size-4 text-primary" />
              </Link>
            ))}
          </div>
        </section>
        <section className="rounded-2xl border bg-card p-6">
          <h2 className="mb-4 font-semibold">Activité récente</h2>
          <div className="space-y-3 text-sm">
            {CALLS.slice(0, 4).map((c) => (
              <div key={c.id} className="flex justify-between">
                <span>{c.name ?? c.phone}<span className="block text-muted-foreground">{c.type} · {c.status}</span></span>
                <span className="text-muted-foreground">{formatDuration(c.duration)}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
