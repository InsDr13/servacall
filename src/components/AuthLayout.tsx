import { Link } from "@tanstack/react-router";
import { PhoneCall } from "lucide-react";
import type { ReactNode } from "react";

export function Logo({ light }: { light?: boolean }) {
  return (
    <Link to="/" className={`flex items-center gap-2 font-display text-xl font-bold ${light ? "text-sidebar-foreground" : "text-foreground"}`}>
      <span className="grid size-9 place-items-center rounded-xl bg-accent text-accent-foreground">
        <PhoneCall className="size-5" />
      </span>
      Serva Call
    </Link>
  );
}

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-hero p-12 text-sidebar-foreground lg:flex">
        <Logo light />
        <div>
          <h2 className="text-4xl font-bold leading-tight">Appelez n'importe quel téléphone,<br />depuis internet.</h2>
          <p className="mt-4 max-w-md text-sidebar-foreground/70">Vos proches n'ont pas besoin d'internet : ils reçoivent un appel classique sur leur mobile.</p>
        </div>
        <p className="text-sm text-sidebar-foreground/50">© 2026 Serva Call</p>
      </div>
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden"><Logo /></div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
