import { useEffect, useState } from "react";
import { COUNTRIES, detectCountry, type Country } from "@/lib/countries";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onCountry?: (c: Country | undefined) => void;
  id?: string;
};

/** International number field: typing "+225…" auto-selects Côte d'Ivoire, etc. */
export function PhoneInput({ value, onChange, onCountry, id }: Props) {
  const [country, setCountry] = useState<Country | undefined>(detectCountry(value));

  useEffect(() => {
    const c = detectCountry(value);
    if (c && c.dial !== country?.dial) setCountry(c);
    if (!c) setCountry(undefined);
    onCountry?.(c);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="flex gap-2">
      <Select
        value={country?.code ?? ""}
        onValueChange={(code) => {
          const c = COUNTRIES.find((x) => x.code === code)!;
          setCountry(c);
          const rest = value.replace(/\D/g, "").slice(country?.dial.length ?? 0);
          onChange(`+${c.dial}${rest}`);
        }}
      >
        <SelectTrigger className="w-[150px] shrink-0">
          <SelectValue placeholder="🌍 Pays" />
        </SelectTrigger>
        <SelectContent>
          {COUNTRIES.map((c) => (
            <SelectItem key={c.code} value={c.code}>
              {c.flag} {c.name} +{c.dial}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        id={id}
        inputMode="tel"
        placeholder="+33 6 12 34 56 78"
        value={value}
        onChange={(e) => {
          let v = e.target.value.replace(/[^\d+\s]/g, "");
          if (v && !v.startsWith("+")) v = "+" + v;
          onChange(v);
        }}
      />
    </div>
  );
}
