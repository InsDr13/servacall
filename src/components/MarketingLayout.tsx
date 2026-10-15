import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Logo } from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";

const links = [{ to: "/services", label: "Nos services" }, { to: "/destinations", label: "Destinations" }, { to: "/faq", label: "Questions fréquentes" }] as const;
export function MarketingLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <div className="min-h-screen bg-background">
    <header className="relative z-30 border-b bg-card">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-5 sm:px-8 lg:flex lg:justify-between">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm font-medium lg:flex">{links.map(l => <Link key={l.to} to={l.to} activeProps={{ className: "text-primary" }}>{l.label}</Link>)}</nav>
        <div className="flex shrink-0 items-center gap-2">
          <Button asChild variant="ghost" className="hidden sm:inline-flex"><Link to="/connexion">Connexion</Link></Button>
          <Button asChild className="hidden sm:inline-flex"><Link to="/inscription">Créer un compte <ArrowUpRight /></Link></Button>
          <Button size="icon" variant="outline" className="lg:hidden" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
        </div>
      </div>
      {open && <nav className="absolute inset-x-0 top-full space-y-1 border-b bg-card p-5 shadow-soft lg:hidden">{links.map(l => <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block rounded-md px-3 py-3 text-sm font-medium">{l.label}</Link>)}<div className="grid grid-cols-2 gap-3 pt-3"><Button asChild variant="outline"><Link to="/connexion">Connexion</Link></Button><Button asChild><Link to="/inscription">Créer un compte</Link></Button></div></nav>}
    </header>
    {children}
    <footer className="border-t bg-card"><div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:grid-cols-2 sm:px-8"><div><Logo /><p className="mt-3 text-sm text-muted-foreground">Un appel. Et la distance s’efface.</p></div><nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm sm:justify-end">{links.map(l => <Link key={l.to} to={l.to}>{l.label}</Link>)}<Link to="/connexion">Mon espace</Link></nav><p className="text-xs text-muted-foreground">© 2026 Serva Call</p><p className="text-xs text-muted-foreground sm:text-right">Version de démonstration · Appels et paiements simulés</p></div></footer>
  </div>;
}
