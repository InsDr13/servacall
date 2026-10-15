import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/AuthLayout";
import { PhoneInput } from "@/components/PhoneInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/connexion")({
  head: () => ({
    meta: [
      { title: "Connexion — Serva Call" },
      { name: "description", content: "Connectez-vous à votre compte Serva Call." },
      { property: "og:title", content: "Connexion — Serva Call" },
      { property: "og:description", content: "Accédez à votre espace Serva Call." },
    ],
  }),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  const [phone, setPhone] = useState("");
  return (
    <AuthLayout title="Bon retour" subtitle="Connectez-vous avec votre numéro de téléphone.">
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Connexion réussie");
          nav({ to: "/tableau-de-bord" });
        }}
      >
        <div className="space-y-2"><Label>Téléphone</Label><PhoneInput value={phone} onChange={setPhone} /></div>
        <div className="space-y-2"><Label htmlFor="pw">Mot de passe</Label><Input id="pw" type="password" required /></div>
        <Button type="submit" className="w-full" size="lg">Se connecter</Button>
        <Button type="button" variant="outline" className="w-full" onClick={() => phone ? nav({ to: "/verification", search: { phone } }) : toast.error("Entrez votre numéro")}>
          Recevoir un code par SMS
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Pas de compte ? <Link to="/inscription" className="font-medium text-primary">S'inscrire</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
