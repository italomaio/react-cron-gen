import { IFormatter, ParseOutput } from "@/domain/interfaces/IFormatter";
import { Fields, Frequency } from "@/domain/types";

export class UnixFormatter implements IFormatter {
  constructor() {}

  private defaultValues = {
    minute: "",
    hour: "",
    dayOfMonth: "",
    month: "",
    dayOfWeek: "",
  } satisfies Fields;

  format(values: Fields, frequency?: Frequency) {
    const preventNullishOrEmpty = Object.entries({
      ...this.defaultValues,
      ...values,
    }).map(([key, value]) => [key, value || "*"]);

    const fieldsNotNulled = Object.fromEntries(
      preventNullishOrEmpty
    ) satisfies Fields;

    return [
      frequency === "minutely"
        ? `*/${fieldsNotNulled.minute}`
        : frequency === "hourly"
          ? "0"
          : fieldsNotNulled.minute,

      frequency === "hourly"
        ? `*/${fieldsNotNulled.hour}`
        : fieldsNotNulled.hour,

      fieldsNotNulled.dayOfMonth,
      fieldsNotNulled.month,
      fieldsNotNulled.dayOfWeek,
    ]
      .join(" ")
      .trim();
  }

  parse(expression: string): ParseOutput | null {
    if (!expression || typeof expression !== "string") {
      return null;
    }

    const parts = expression.trim().split(/\s+/);
    if (parts.length < 2 || parts.length > 5) {
      return null;
    }

    const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;

    const values: Fields = {
      minute: this.parseField(minute),
      hour: this.parseField(hour),
      dayOfMonth: this.parseField(dayOfMonth),
      month: this.parseField(month),
      dayOfWeek: this.parseField(dayOfWeek),
      second: undefined,
      year: undefined,
    };

    const frequency = this.detectFrequency(values, minute, hour);

    return { values, frequency };
  }

  private parseField(value: string | undefined): string | undefined {
    if (!value || value === "*") {
      return undefined;
    }
    if (value.startsWith("*/")) {
      return value.slice(2);
    }
    return value;
  }

  private detectFrequency(
    values: Fields,
    minute: string | undefined,
    hour: string | undefined
  ): Frequency {
    const isMinutely = minute?.startsWith("*/") && (!hour || hour === "*");
    const isHourly =
      hour?.startsWith("*/") &&
      (minute === "0" || minute === "*" || !minute) &&
      !values.dayOfMonth &&
      !values.month &&
      !values.dayOfWeek;

    if (isMinutely) {
      return "minutely";
    }

    if (isHourly) {
      return "hourly";
    }

    if (values.month && !values.dayOfWeek) {
      return "monthly";
    }

    if (values.dayOfWeek) {
      return "weekly";
    }

    return "daily";
  }
}
