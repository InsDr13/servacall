export type Contact = { id: string; name: string; phone: string; favorite?: boolean };
export type CallRecord = {
  id: string;
  name?: string;
  phone: string;
  type: "appel" | "message vocal" | "message texte";
  status: "terminé" | "manqué" | "échoué" | "répondeur";
  duration: number;
  cost: number;
  date: string;
};

export const CONTACTS: Contact[] = [
  { id: "1", name: "Maman", phone: "+221 77 123 45 67", favorite: true },
  { id: "2", name: "Ibrahim Koné", phone: "+225 07 08 09 10 11", favorite: true },
  { id: "3", name: "Claire Martin", phone: "+33 6 12 34 56 78" },
  { id: "4", name: "Youssef Benali", phone: "+212 6 61 22 33 44" },
  { id: "5", name: "Grâce Mbala", phone: "+243 81 234 5678" },
];

export const CALLS: CallRecord[] = [
  { id: "c1", name: "Maman", phone: "+221 77 123 45 67", type: "appel", status: "terminé", duration: 754, cost: 2.76, date: "2026-10-14T10:12:00" },
  { id: "c2", name: "Ibrahim Koné", phone: "+225 07 08 09 10 11", type: "message vocal", status: "terminé", duration: 42, cost: 0.24, date: "2026-10-13T18:40:00" },
  { id: "c3", phone: "+33 6 98 76 54 32", type: "appel", status: "manqué", duration: 0, cost: 0, date: "2026-10-13T09:05:00" },
  { id: "c4", name: "Youssef Benali", phone: "+212 6 61 22 33 44", type: "message texte", status: "répondeur", duration: 25, cost: 0.18, date: "2026-10-12T21:30:00" },
  { id: "c5", name: "Grâce Mbala", phone: "+243 81 234 5678", type: "appel", status: "échoué", duration: 0, cost: 0, date: "2026-10-11T14:22:00" },
];

export const LOGS = [
  { t: "2026-10-14 10:24:31", level: "info", event: "CALL_FINISHED", detail: "Appel +221771234567 terminé — 12:34, cause NORMAL_HANGUP" },
  { t: "2026-10-14 10:12:02", level: "info", event: "CALL_ESTABLISHED", detail: "Appel décroché par le destinataire" },
  { t: "2026-10-14 10:11:48", level: "info", event: "CALL_RINGING", detail: "Sonnerie chez +221771234567" },
  { t: "2026-10-13 18:40:12", level: "info", event: "MACHINE_DETECTED", detail: "Répondeur détecté — message déposé" },
  { t: "2026-10-11 14:22:10", level: "error", event: "CALL_FAILED", detail: "Numéro injoignable (NO_ANSWER après 45 s)" },
  { t: "2026-10-10 08:00:00", level: "warn", event: "BALANCE_LOW", detail: "Solde inférieur à 5,00 €" },
];

export const NOTIFICATIONS = [
  { id: "n1", title: "Recharge réussie", body: "10,00 € ajoutés à votre solde.", date: "Aujourd'hui, 09:30", read: false },
  { id: "n2", title: "Message vocal délivré", body: "Votre message à Ibrahim Koné a été écouté.", date: "Hier, 18:41", read: false },
  { id: "n3", title: "Appel échoué", body: "Grâce Mbala n'a pas répondu.", date: "11 oct., 14:22", read: true },
];

export const formatDuration = (s: number) =>
  `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;
export const euro = (n: number) => n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
