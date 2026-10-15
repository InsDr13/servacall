import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export const Route = createFileRoute("/verification")({
  validateSearch: (s: Record<string, unknown>) => ({ phone: (s["phone"] as string) ?? "" }),
  head: () => ({
    meta: [
      { title: "Vérification du numéro — Serva Call" },
      { name: "description", content: "Saisissez le code reçu par SMS." },
      { property: "og:title", content: "Vérification — Serva Call" },
      { property: "og:description", content: "Validation OTP de votre numéro." },
    ],
  }),
  component: Verify,
});

function Verify() {
  const { phone } = Route.useSearch();
  const nav = useNavigate();
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (timer <= 0) return;
    const t = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  return (
    <AuthLayout title="Vérifiez votre numéro" subtitle={`Code à 6 chiffres envoyé au ${phone || "votre numéro"}.`}>
      <div className="space-y-6">
        <InputOTP maxLength={6} value={code} onChange={setCode}>
          <InputOTPGroup>
            {[0, 1, 2, 3, 4, 5].map((i) => <InputOTPSlot key={i} index={i} className="size-12 text-lg" />)}
          </InputOTPGroup>
        </InputOTP>
        <Button
          className="w-full"
          size="lg"
          disabled={code.length < 6}
          onClick={() => {
            toast.success("Numéro vérifié ! 1,00 € offert sur votre solde.");
            nav({ to: "/tableau-de-bord" });
          }}
        >
          Valider
        </Button>
        <div className="flex justify-between text-sm">
          <button
            disabled={timer > 0}
            onClick={() => { setTimer(60); toast.info("Nouveau code envoyé"); }}
            className="font-medium text-primary disabled:text-muted-foreground"
          >
            {timer > 0 ? `Renvoyer dans ${timer}s` : "Renvoyer le code"}
          </button>
          <button onClick={() => { setTimer(60); toast.info("Vous allez recevoir un appel vocal avec le code"); }} className="font-medium text-primary">
            Recevoir par appel
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
