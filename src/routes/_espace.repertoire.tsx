import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageSquareText, Phone, Plus, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageTitle } from "@/components/PageTitle";
import { PhoneInput } from "@/components/PhoneInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CONTACTS, type Contact } from "@/lib/mock";
import { detectCountry } from "@/lib/countries";

export const Route = createFileRoute("/_espace/repertoire")({
  head: () => ({
    meta: [
      { title: "Répertoire — Serva Call" },
      { name: "description", content: "Gérez vos contacts et numéros favoris." },
      { property: "og:title", content: "Répertoire — Serva Call" },
      { property: "og:description", content: "Vos contacts." },
    ],
  }),
  component: ContactsPage,
});

function ContactsPage() {
  const [list, setList] = useState<Contact[]>(CONTACTS);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+");
  const [q, setQ] = useState("");

  return (
    <>
      <div className="flex items-start justify-between">
        <PageTitle title="Répertoire" subtitle={`${list.length} contacts`} />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus /> Ajouter</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Nouveau contact</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2"><Label>Nom</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
              <div className="space-y-2"><Label>Téléphone</Label><PhoneInput value={phone} onChange={setPhone} /></div>
            </div>
            <DialogFooter>
              <Button onClick={() => {
                if (!name || !detectCountry(phone)) return void toast.error("Nom et numéro valides requis");
                setList([...list, { id: crypto.randomUUID(), name, phone }]);
                setName(""); setPhone("+"); setOpen(false);
                toast.success("Contact ajouté");
                return undefined;
              }}>Enregistrer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Input placeholder="Rechercher un contact…" value={q} onChange={(e) => setQ(e.target.value)} className="mb-4 max-w-sm" />
      <div className="grid gap-3 sm:grid-cols-2">
        {list.filter((c) => c.name.toLowerCase().includes(q.toLowerCase())).map((c) => (
          <div key={c.id} className="flex items-center gap-3 rounded-2xl border bg-card p-4">
            <div className="grid size-11 place-items-center rounded-full bg-secondary font-display font-bold text-primary">{c.name[0]}</div>
            <div className="flex-1 min-w-0">
              <p className="truncate font-medium">{detectCountry(c.phone)?.flag} {c.name}</p>
              <p className="text-sm text-muted-foreground">{c.phone}</p>
            </div>
            <button aria-label="Favori" onClick={() => setList(list.map((x) => x.id === c.id ? { ...x, favorite: !x.favorite } : x))}>
              <Star className={`size-4 ${c.favorite ? "fill-warning text-warning" : "text-muted-foreground"}`} />
            </button>
            <Link to="/appel" search={{ to: c.phone }} aria-label="Appeler"><Phone className="size-4 text-primary" /></Link>
            <Link to="/message" aria-label="Message"><MessageSquareText className="size-4 text-primary" /></Link>
            <button aria-label="Supprimer" onClick={() => { setList(list.filter((x) => x.id !== c.id)); toast("Contact supprimé"); }}>
              <Trash2 className="size-4 text-muted-foreground" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
