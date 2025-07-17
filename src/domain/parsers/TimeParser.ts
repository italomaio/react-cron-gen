import { FormatTimeInput, TimeParserOutput } from "@/domain/types/parsers";

export class TimeParser {
  static parse(value: string): TimeParserOutput | null {
    const parts = value.split(":");

    const [h, m] = parts;
    if (!/^\d{1,2}$/.test(h) || !/^\d{1,2}$/.test(m)) return null;

    const hour = h.padStart(2, "0");
    const minute = m.padStart(2, "0");

    if (Number(hour) > 23 || Number(minute) > 59) return null;

    return { hour, minute };
  }

  static format({ hour, minute }: FormatTimeInput): string {
    const hh = String(hour).padStart(2, "0");
    const mm = String(minute).padStart(2, "0");

    return `${hh}:${mm}`;
  }
}
