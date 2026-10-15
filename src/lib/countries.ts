export type Country = { code: string; name: string; dial: string; flag: string; rate: number };

export const COUNTRIES: Country[] = [
  { code: "FR", name: "France", dial: "33", flag: "🇫🇷", rate: 0.05 },
  { code: "BE", name: "Belgique", dial: "32", flag: "🇧🇪", rate: 0.06 },
  { code: "CH", name: "Suisse", dial: "41", flag: "🇨🇭", rate: 0.08 },
  { code: "CA", name: "Canada", dial: "1", flag: "🇨🇦", rate: 0.03 },
  { code: "US", name: "États-Unis", dial: "1", flag: "🇺🇸", rate: 0.02 },
  { code: "GB", name: "Royaume-Uni", dial: "44", flag: "🇬🇧", rate: 0.05 },
  { code: "DE", name: "Allemagne", dial: "49", flag: "🇩🇪", rate: 0.05 },
  { code: "ES", name: "Espagne", dial: "34", flag: "🇪🇸", rate: 0.05 },
  { code: "IT", name: "Italie", dial: "39", flag: "🇮🇹", rate: 0.05 },
  { code: "PT", name: "Portugal", dial: "351", flag: "🇵🇹", rate: 0.06 },
  { code: "MA", name: "Maroc", dial: "212", flag: "🇲🇦", rate: 0.18 },
  { code: "DZ", name: "Algérie", dial: "213", flag: "🇩🇿", rate: 0.2 },
  { code: "TN", name: "Tunisie", dial: "216", flag: "🇹🇳", rate: 0.19 },
  { code: "SN", name: "Sénégal", dial: "221", flag: "🇸🇳", rate: 0.22 },
  { code: "ML", name: "Mali", dial: "223", flag: "🇲🇱", rate: 0.28 },
  { code: "CI", name: "Côte d'Ivoire", dial: "225", flag: "🇨🇮", rate: 0.24 },
  { code: "BF", name: "Burkina Faso", dial: "226", flag: "🇧🇫", rate: 0.26 },
  { code: "TG", name: "Togo", dial: "228", flag: "🇹🇬", rate: 0.25 },
  { code: "BJ", name: "Bénin", dial: "229", flag: "🇧🇯", rate: 0.25 },
  { code: "CM", name: "Cameroun", dial: "237", flag: "🇨🇲", rate: 0.23 },
  { code: "GA", name: "Gabon", dial: "241", flag: "🇬🇦", rate: 0.27 },
  { code: "CG", name: "Congo", dial: "242", flag: "🇨🇬", rate: 0.29 },
  { code: "CD", name: "RD Congo", dial: "243", flag: "🇨🇩", rate: 0.3 },
  { code: "MG", name: "Madagascar", dial: "261", flag: "🇲🇬", rate: 0.32 },
  { code: "HT", name: "Haïti", dial: "509", flag: "🇭🇹", rate: 0.21 },
  { code: "NG", name: "Nigeria", dial: "234", flag: "🇳🇬", rate: 0.12 },
];

/** Detects the country from an international number (digits only, longest prefix wins). */
export function detectCountry(raw: string): Country | undefined {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return undefined;
  for (let len = 3; len >= 1; len--) {
    const prefix = digits.slice(0, len);
    const match = COUNTRIES.find((c) => c.dial === prefix);
    if (match) return match;
  }
  return undefined;
}
