import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { NOTIFICATIONS } from "@/lib/mock";

export const Route = createFileRoute("/_espace/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — Serva Call" },
      { name: "description", content: "Vos alertes et confirmations." },
      { property: "og:title", content: "Notifications — Serva Call" },
      { property: "og:description", content: "Alertes Serva Call." },
    ],
  }),
  component: NotifPage,
});

function NotifPage() {
  const [list, setList] = useState(NOTIFICATIONS);
  return (
    <>
      <div className="flex items-start justify-between">
        <PageTitle title="Notifications" />
        <Button variant="outline" onClick={() => setList(list.map((n) => ({ ...n, read: true })))}>Tout marquer comme lu</Button>
      </div>
      <div className="space-y-3">
        {list.map((n) => (
          <div key={n.id} className={`flex gap-3 rounded-2xl border p-4 ${n.read ? "bg-card" : "bg-secondary"}`}>
            <span className={`mt-1.5 size-2 shrink-0 rounded-full ${n.read ? "bg-transparent" : "bg-primary"}`} />
            <div className="flex-1"><p className="font-medium">{n.title}</p><p className="text-sm text-muted-foreground">{n.body}</p></div>
            <span className="text-xs text-muted-foreground">{n.date}</span>
          </div>
        ))}
      </div>
    </>
  );
}
