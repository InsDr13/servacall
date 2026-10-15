import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/AuthLayout";
import { PhoneInput } from "@/components/PhoneInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/inscription")({
  head: () => ({
    meta: [
      { title: "Créer un compte — Serva Call" },
      { name: "description", content: "Inscrivez-vous à Serva Call pour appeler vers tous les mobiles." },
      { property: "og:title", content: "Créer un compte — Serva Call" },
      { property: "og:description", content: "Inscription à Serva Call." },
    ],
  }),
  component: Signup,
});

function Signup() {
  const nav = useNavigate();
  const [phone, setPhone] = useState("");
  const [accept, setAccept] = useState(false);

  return (
    <AuthLayout title="Créer un compte" subtitle="Quelques secondes suffisent. Nous vérifierons votre numéro par SMS.">
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (phone.replace(/\D/g, "").length < 8) return void toast.error("Numéro de téléphone invalide");
          if (!accept) return void toast.error("Veuillez accepter les conditions");
          toast.success("Code envoyé par SMS");
          nav({ to: "/verification", search: { phone } });
          return undefined;
        }}
      >
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2"><Label htmlFor="fn">Prénom</Label><Input id="fn" required /></div>
          <div className="space-y-2"><Label htmlFor="ln">Nom</Label><Input id="ln" required /></div>
        </div>
        <div className="space-y-2"><Label htmlFor="em">E-mail</Label><Input id="em" type="email" required /></div>
        <div className="space-y-2"><Label htmlFor="ph">Téléphone</Label><PhoneInput id="ph" value={phone} onChange={setPhone} /></div>
        <div className="space-y-2"><Label htmlFor="pw">Mot de passe</Label><Input id="pw" type="password" minLength={8} required /></div>
        <label className="flex items-start gap-2 text-sm text-muted-foreground">
          <Checkbox checked={accept} onCheckedChange={(v) => setAccept(!!v)} className="mt-0.5" />
          J'accepte les conditions d'utilisation et la politique de confidentialité.
        </label>
        <Button type="submit" className="w-full" size="lg">Créer mon compte</Button>
        <p className="text-center text-sm text-muted-foreground">
          Déjà inscrit ? <Link to="/connexion" className="font-medium text-primary">Se connecter</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
