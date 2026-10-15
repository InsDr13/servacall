import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/MarketingLayout";
import { FaqSection, SignupSection } from "@/components/MarketingSections";
export const Route = createFileRoute("/faq")({ head: () => ({ meta: [{ title: "Questions fréquentes — Serva Call" },{ name: "description", content: "Les réponses à vos questions sur les appels internet vers GSM et les messages vocaux." },{ property: "og:title", content: "Questions fréquentes — Serva Call" },{ property: "og:description", content: "Internet, solde, messages et disponibilité : les réponses Serva Call." },{ property: "og:type", content: "website" },{ name: "twitter:card", content: "summary_large_image" }] }), component: FaqPage });
function FaqPage() { return <MarketingLayout><div className="page-intro"><p className="eyebrow">SERVA CALL</p><h1>Questions fréquentes</h1><p>Tout savoir avant de retrouver vos proches.</p></div><FaqSection/><SignupSection/></MarketingLayout>; }
