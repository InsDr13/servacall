import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { Bell, BookUser, History, LayoutDashboard, LogOut, Menu, MessageSquareText, Phone, ScrollText, Settings, Wallet } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/AuthLayout";
import { euro } from "@/lib/mock";

export const Route = createFileRoute("/_espace")({ component: Shell });

const NAV = [
  { to: "/tableau-de-bord", label: "Accueil", icon: LayoutDashboard },
  { to: "/appel", label: "Appeler", icon: Phone },
  { to: "/message", label: "Message vocal", icon: MessageSquareText },
  { to: "/historique", label: "Historique", icon: History },
  { to: "/repertoire", label: "Répertoire", icon: BookUser },
  { to: "/solde", label: "Solde", icon: Wallet },
  { to: "/journal", label: "Journal", icon: ScrollText },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/parametres", label: "Paramètres", icon: Settings },
] as const;

function Shell() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  return (
    <div className="flex min-h-screen">
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 flex-col bg-sidebar p-4 text-sidebar-foreground transition-transform lg:static lg:flex lg:translate-x-0 ${open ? "flex translate-x-0" : "hidden -translate-x-full"}`}>
        <div className="px-2 py-3"><Logo light /></div>
        <div className="my-4 rounded-xl bg-sidebar-accent p-4">
          <p className="text-xs text-sidebar-foreground/60">Solde disponible</p>
          <p className="font-display text-2xl font-bold">{euro(12.4)}</p>
          <Link to="/solde" className="mt-2 inline-block text-xs font-semibold text-sidebar-primary">+ Recharger</Link>
        </div>
        <nav className="flex-1 space-y-1">
          {NAV.map((n) => {
            const active = pathname === n.to;
            return (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${active ? "bg-sidebar-primary text-sidebar-primary-foreground" : "hover:bg-sidebar-accent"}`}>
                <n.icon className="size-4" />{n.label}
                {n.to === "/notifications" && <span className="ml-auto rounded-full bg-destructive px-1.5 text-xs text-destructive-foreground">2</span>}
              </Link>
            );
          })}
        </nav>
        <Link to="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent">
          <LogOut className="size-4" />Déconnexion
        </Link>
      </aside>
      {open && <div className="fixed inset-0 z-30 bg-foreground/40 lg:hidden" onClick={() => setOpen(false)} />}
      <div className="flex-1 min-w-0">
        <header className="flex items-center gap-3 border-b bg-card p-4 lg:hidden">
          <button onClick={() => setOpen(true)} aria-label="Menu"><Menu /></button>
          <Logo />
        </header>
        <main className="mx-auto max-w-5xl p-6 lg:p-10"><Outlet /></main>
      </div>
    </div>
  );
}

