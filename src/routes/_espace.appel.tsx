import { createFileRoute } from "@tanstack/react-router";
import { Delete, Grid3x3, Mic, MicOff, Pause, Phone, PhoneOff, Volume2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PageTitle } from "@/components/PageTitle";
import { PhoneInput } from "@/components/PhoneInput";
import { CallOptions, DEFAULT_OPTS } from "@/components/CallOptions";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import type { Country } from "@/lib/countries";
import { euro, formatDuration } from "@/lib/mock";

export const Route = createFileRoute("/_espace/appel")({
  validateSearch: (s: Record<string, unknown>): { to?: string | undefined } => ({ to: typeof s["to"] === "string" ? s["to"] : undefined }),
  head: () => ({
    meta: [
      { title: "Passer un appel — Serva Call" },
      { name: "description", content: "Appelez un téléphone mobile ou fixe depuis internet." },
      { property: "og:title", content: "Passer un appel — Serva Call" },
      { property: "og:description", content: "Composez et appelez." },
    ],
  }),
  component: CallPage,
});

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

function CallPage() {
  const { to } = Route.useSearch();
  const [phone, setPhone] = useState(to ?? "+");
  const [country, setCountry] = useState<Country>();
  const [opts, setOpts] = useState(DEFAULT_OPTS);
  const [confirm, setConfirm] = useState(false);
  const [state, setState] = useState<"idle" | "ringing" | "live">("idle");
  const [secs, setSecs] = useState(0);
  const [muted, setMuted] = useState(false);
  const [held, setHeld] = useState(false);
  const [pad, setPad] = useState(false);

  useEffect(() => {
    if (state === "ringing") { const t = setTimeout(() => setState("live"), 2500); return () => clearTimeout(t); }
    if (state === "live") { const t = setInterval(() => setSecs((s) => s + 1), 1000); return () => clearInterval(t); }
    return undefined;
  }, [state]);

  const hangup = () => {
    toast.success(`Appel terminé — ${formatDuration(secs)} · ${euro((secs / 60) * (country?.rate ?? 0.1))}`);
    setState("idle"); setSecs(0); setMuted(false); setHeld(false); setPad(false);
  };

  if (state !== "idle") {
    return (
      <div className="mx-auto flex max-w-sm flex-col items-center rounded-3xl bg-hero p-10 text-sidebar-foreground shadow-soft">
        <div className={`grid size-24 place-items-center rounded-full bg-accent text-3xl text-accent-foreground ${state === "ringing" ? "pulse-ring" : ""}`}>
          {country?.flag ?? "📞"}
        </div>
        <p className="mt-6 font-display text-2xl font-bold">{phone}</p>
        <p className="mt-1 text-sidebar-foreground/70">
          {state === "ringing" ? "Appel en cours…" : held ? "En attente" : formatDuration(secs)}
        </p>
        {opts.record && state === "live" && <p className="mt-2 text-xs text-destructive">● Enregistrement</p>}
        {pad && (
          <div className="mt-6 grid grid-cols-3 gap-2">
            {KEYS.map((k) => <button key={k} onClick={() => toast(`DTMF envoyé : ${k}`)} className="size-12 rounded-full bg-sidebar-accent font-display text-lg">{k}</button>)}
          </div>
        )}
        <div className="mt-8 flex gap-4">
          <RoundBtn on={muted} onClick={() => setMuted(!muted)} label="Muet">{muted ? <MicOff /> : <Mic />}</RoundBtn>
          <RoundBtn on={held} onClick={() => setHeld(!held)} label="Attente"><Pause /></RoundBtn>
          <RoundBtn on={pad} onClick={() => setPad(!pad)} label="Clavier"><Grid3x3 /></RoundBtn>
          <RoundBtn label="Haut-parleur" onClick={() => {}}><Volume2 /></RoundBtn>
        </div>
        <button onClick={hangup} aria-label="Raccrocher" className="mt-8 grid size-16 place-items-center rounded-full bg-destructive text-destructive-foreground">
          <PhoneOff />
        </button>
      </div>
    );
  }

  return (
    <>
      <PageTitle title="Passer un appel" subtitle="Votre correspondant reçoit un appel normal, sans internet." />
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <div className="rounded-2xl border bg-card p-6">
            <PhoneInput value={phone} onChange={setPhone} onCountry={setCountry} />
            <p className="mt-3 text-sm text-muted-foreground">
              {country ? <>Destination : <b className="text-foreground">{country.flag} {country.name}</b> · {euro(country.rate)}/min</> : "Saisissez l'indicatif pays (ex : +225) — le pays est détecté automatiquement."}
            </p>
          </div>
          <Accordion type="single" collapsible className="rounded-2xl border bg-card px-6">
            <AccordionItem value="o" className="border-none">
              <AccordionTrigger>Options avancées de l'appel</AccordionTrigger>
              <AccordionContent><CallOptions value={opts} onChange={setOpts} /></AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="rounded-2xl border bg-card p-6">
          <div className="grid grid-cols-3 gap-3">
            {KEYS.map((k) => (
              <button key={k} onClick={() => setPhone(phone + k)} className="h-14 rounded-xl bg-muted font-display text-xl font-semibold hover:bg-secondary">{k}</button>
            ))}
          </div>
          <div className="mt-4 flex gap-3">
            <Button size="lg" className="h-14 flex-1 bg-success text-primary-foreground hover:bg-success/90" onClick={() => country ? setConfirm(true) : toast.error("Numéro incomplet ou pays non pris en charge")}>
              <Phone /> Appeler
            </Button>
            <Button size="lg" variant="outline" className="h-14" onClick={() => setPhone(phone.slice(0, -1) || "+")}><Delete /></Button>
          </div>
        </div>
      </div>
      <AlertDialog open={confirm} onOpenChange={setConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Appeler {phone} ?</AlertDialogTitle>
            <AlertDialogDescription>
              {country?.flag} {country?.name} — tarif {euro(country?.rate ?? 0)}/min. Durée max {Math.round(opts.maxDuration / 60)} min.
              {opts.record && " L'appel sera enregistré."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={() => setState("ringing")}>Lancer l'appel</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function RoundBtn({ children, on, onClick, label }: { children: React.ReactNode; on?: boolean; onClick: () => void; label: string }) {
  return (
    <button aria-label={label} onClick={onClick} className={`grid size-12 place-items-center rounded-full ${on ? "bg-accent text-accent-foreground" : "bg-sidebar-accent"}`}>
      {children}
    </button>
  );
}
