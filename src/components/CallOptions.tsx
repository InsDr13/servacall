import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type CallOpts = {
  callerId: string;
  record: boolean;
  machineDetection: boolean;
  maxDuration: number;
  ringTimeout: number;
  retries: number;
  dtmf: boolean;
};

export const DEFAULT_OPTS: CallOpts = {
  callerId: "auto",
  record: false,
  machineDetection: true,
  maxDuration: 3600,
  ringTimeout: 45,
  retries: 0,
  dtmf: false,
};

/** Options mirroring Infobip Voice API call parameters. */
export function CallOptions({ value, onChange }: { value: CallOpts; onChange: (v: CallOpts) => void }) {
  const set = <K extends keyof CallOpts>(k: K, v: CallOpts[K]) => onChange({ ...value, [k]: v });
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="space-y-2">
        <Label>Numéro affiché (Caller ID)</Label>
        <Select value={value.callerId} onValueChange={(v) => set("callerId", v)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="auto">Automatique (numéro Serva Call)</SelectItem>
            <SelectItem value="own">Mon numéro vérifié</SelectItem>
            <SelectItem value="hidden">Masqué</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Délai de sonnerie (s)</Label>
        <Input type="number" min={10} max={120} value={value.ringTimeout} onChange={(e) => set("ringTimeout", +e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label>Durée max de l'appel (s)</Label>
        <Input type="number" min={60} value={value.maxDuration} onChange={(e) => set("maxDuration", +e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label>Nouvelles tentatives si pas de réponse</Label>
        <Select value={String(value.retries)} onValueChange={(v) => set("retries", +v)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {[0, 1, 2, 3].map((n) => <SelectItem key={n} value={String(n)}>{n === 0 ? "Aucune" : `${n} tentative(s)`}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      {([
        ["record", "Enregistrer l'appel"],
        ["machineDetection", "Détection de répondeur (AMD)"],
        ["dtmf", "Capturer les touches (DTMF)"],
      ] as const).map(([k, l]) => (
        <label key={k} className="flex items-center justify-between rounded-lg border p-3 text-sm">
          {l}
          <Switch checked={value[k]} onCheckedChange={(v) => set(k, v)} />
        </label>
      ))}
    </div>
  );
}
