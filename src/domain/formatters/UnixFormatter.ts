import { IFormatter } from "@/domain/interfaces/IFormatter";
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
}
