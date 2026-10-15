import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, Smartphone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { COUNTRIES } from "@/lib/countries";
import { euro } from "@/lib/mock";

export const Route = createFileRoute("/_espace/solde")({
  head: () => ({
    meta: [
      { title: "Solde et recharge — Serva Call" },
      { name: "description", content: "Consultez votre solde et achetez du crédit d'appel." },
      { property: "og:title", content: "Solde — Serva Call" },
      { property: "og:description", content: "Recharger votre crédit." },
    ],
  }),
  component: BalancePage,
});

const PACKS = [5, 10, 20, 50];

function BalancePage() {
  const [amount, setAmount] = useState(10);
  const [method, setMethod] = useState("card");
  return (
    <>
      <PageTitle title="Solde" />
      <div className="rounded-3xl bg-hero p-8 text-sidebar-foreground shadow-soft">
        <p className="text-sidebar-foreground/70">Solde disponible</p>
        <p className="font-display text-5xl font-bold">{euro(12.4)}</p>
        <p className="mt-2 text-sm text-sidebar-foreground/70">≈ 54 min vers la Côte d'Ivoire · ≈ 248 min vers la France</p>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border bg-card p-6 space-y-5">
          <h2 className="font-semibold">Acheter du crédit</h2>
          <div className="grid grid-cols-4 gap-2">
            {PACKS.map((p) => (
              <button key={p} onClick={() => setAmount(p)} className={`rounded-xl border p-3 font-display font-semibold ${amount === p ? "border-primary bg-secondary text-primary" : ""}`}>{p} €</button>
            ))}
          </div>
          <div className="space-y-2"><Label>Autre montant</Label><Input type="number" min={2} value={amount} onChange={(e) => setAmount(+e.target.value)} /></div>
          <RadioGroup value={method} onValueChange={setMethod} className="grid grid-cols-2 gap-2">
            <label className="flex items-center gap-2 rounded-xl border p-3 text-sm"><RadioGroupItem value="card" /><CreditCard className="size-4" /> Carte bancaire</label>
            <label className="flex items-center gap-2 rounded-xl border p-3 text-sm"><RadioGroupItem value="mobile" /><Smartphone className="size-4" /> Mobile Money</label>
          </RadioGroup>
          <Button size="lg" className="w-full" onClick={() => toast.success(`Recharge de ${euro(amount)} réussie`)}>Payer {euro(amount)}</Button>
        </section>
        <section className="rounded-2xl border bg-card p-6">
          <h2 className="mb-4 font-semibold">Tarifs par minute</h2>
          <div className="max-h-96 space-y-1 overflow-auto text-sm">
            {COUNTRIES.map((c) => (
              <div key={c.code} className="flex justify-between rounded-lg px-2 py-1.5 hover:bg-muted">
                <span>{c.flag} {c.name} <span className="text-muted-foreground">+{c.dial}</span></span><span className="font-medium">{euro(c.rate)}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
