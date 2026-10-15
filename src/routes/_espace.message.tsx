import { createFileRoute } from "@tanstack/react-router";
import { Mic, Square, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { PageTitle } from "@/components/PageTitle";
import { PhoneInput } from "@/components/PhoneInput";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Country } from "@/lib/countries";
import { formatDuration } from "@/lib/mock";

export const Route = createFileRoute("/_espace/message")({
  head: () => ({
    meta: [
      { title: "Message vocal — Serva Call" },
      { name: "description", content: "Envoyez un message vocal enregistré ou un texte lu par une voix." },
      { property: "og:title", content: "Message vocal — Serva Call" },
      { property: "og:description", content: "Enregistrement audio ou synthèse vocale." },
    ],
  }),
  component: MessagePage,
});

function MessagePage() {
  const [phone, setPhone] = useState("+");
  const [country, setCountry] = useState<Country>();
  const [mode, setMode] = useState("audio");
  const [text, setText] = useState("");
  const [lang, setLang] = useState("fr");
  const [voice, setVoice] = useState("female");
  const [rate, setRate] = useState([1]);
  const [repeat, setRepeat] = useState("1");
  const [schedule, setSchedule] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string>();
  const [recording, setRecording] = useState(false);
  const [secs, setSecs] = useState(0);
  const rec = useRef<MediaRecorder | null>(null);
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const chunks: Blob[] = [];
      const r = new MediaRecorder(stream);
      r.ondataavailable = (e) => chunks.push(e.data);
      r.onstop = () => {
        setAudioUrl(URL.createObjectURL(new Blob(chunks, { type: "audio/webm" })));
        stream.getTracks().forEach((t) => t.stop());
      };
      r.start(); rec.current = r; setRecording(true); setSecs(0);
      timer.current = setInterval(() => setSecs((s) => s + 1), 1000);
    } catch {
      toast.error("Accès au micro refusé");
    }
  };
  const stop = () => { rec.current?.stop(); setRecording(false); clearInterval(timer.current); };

  const send = () => {
    if (!country) return void toast.error("Numéro invalide");
    if (mode === "audio" && !audioUrl) return void toast.error("Enregistrez d'abord votre message");
    if (mode === "text" && !text.trim()) return void toast.error("Écrivez votre message");
    toast.success(schedule ? "Message programmé" : `Message vocal envoyé à ${phone}`);
  };

  return (
    <>
      <PageTitle title="Message vocal" subtitle="Le destinataire reçoit un appel qui lui lit votre message." />
      <div className="space-y-6">
        <div className="rounded-2xl border bg-card p-6 space-y-2">
          <Label>Destinataire</Label>
          <PhoneInput value={phone} onChange={setPhone} onCountry={setCountry} />
          {country && <p className="text-sm text-muted-foreground">{country.flag} {country.name}</p>}
        </div>
        <Tabs value={mode} onValueChange={setMode} className="rounded-2xl border bg-card p-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="audio">🎙️ Enregistrer ma voix</TabsTrigger>
            <TabsTrigger value="text">✍️ Écrire un texte</TabsTrigger>
          </TabsList>
          <TabsContent value="audio" className="pt-6">
            <div className="flex flex-col items-center gap-4 py-6">
              <button onClick={recording ? stop : start} className={`grid size-20 place-items-center rounded-full ${recording ? "pulse-ring bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground"}`}>
                {recording ? <Square /> : <Mic className="size-8" />}
              </button>
              <p className="font-display text-lg">{recording ? formatDuration(secs) : audioUrl ? "Enregistrement prêt" : "Appuyez pour enregistrer"}</p>
              {audioUrl && !recording && (
                <div className="flex items-center gap-2">
                  <audio src={audioUrl} controls />
                  <Button variant="ghost" size="icon" onClick={() => setAudioUrl(undefined)}><Trash2 /></Button>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="text" className="space-y-5 pt-6">
            <Textarea rows={5} maxLength={1400} placeholder="Bonjour, c'est moi…" value={text} onChange={(e) => setText(e.target.value)} />
            <p className="text-right text-xs text-muted-foreground">{text.length}/1400</p>
            <div className="grid gap-5 sm:grid-cols-3">
              <div className="space-y-2"><Label>Langue</Label>
                <Select value={lang} onValueChange={setLang}><SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="fr">Français</SelectItem><SelectItem value="en">Anglais</SelectItem><SelectItem value="ar">Arabe</SelectItem><SelectItem value="es">Espagnol</SelectItem><SelectItem value="pt">Portugais</SelectItem></SelectContent>
                </Select></div>
              <div className="space-y-2"><Label>Voix</Label>
                <Select value={voice} onValueChange={setVoice}><SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="female">Féminine</SelectItem><SelectItem value="male">Masculine</SelectItem></SelectContent>
                </Select></div>
              <div className="space-y-2"><Label>Vitesse : {rate[0]}×</Label><Slider min={0.5} max={2} step={0.1} value={rate} onValueChange={setRate} className="pt-3" /></div>
            </div>
            <Button variant="outline" onClick={() => {
              if (!("speechSynthesis" in window) || !text) return;
              const u = new SpeechSynthesisUtterance(text); u.lang = lang; u.rate = rate[0] ?? 1; speechSynthesis.speak(u);
            }}>▶ Écouter un aperçu</Button>
          </TabsContent>
        </Tabs>
        <div className="grid gap-4 rounded-2xl border bg-card p-6 sm:grid-cols-2">
          <div className="space-y-2"><Label>Répéter le message</Label>
            <Select value={repeat} onValueChange={setRepeat}><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{["1", "2", "3"].map((n) => <SelectItem key={n} value={n}>{n} fois</SelectItem>)}</SelectContent>
            </Select></div>
          <label className="flex items-center justify-between rounded-lg border p-3 text-sm">Programmer l'envoi<Switch checked={schedule} onCheckedChange={setSchedule} /></label>
          {schedule && <div className="space-y-2 sm:col-span-2"><Label>Date et heure</Label><Input type="datetime-local" /></div>}
        </div>
        <Button size="lg" className="w-full" onClick={send}>Envoyer le message vocal</Button>
      </div>
    </>
  );
}
