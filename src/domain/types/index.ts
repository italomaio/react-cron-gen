export type Frequency = "minutely" | "hourly" | "daily" | "weekly" | "monthly";
// TODO: Implement yearly expression with quartz
// | "yearly";

export type Fields = {
  second?: string;
  year?: string;
  minute?: string;
  hour?: string;
  dayOfMonth?: string;
  month?: string;
  dayOfWeek?: string;
};

export type CronField = keyof Fields;

export type ExpressionType = "unix" | "quartz";

export enum Locales {
  PT_BR = "pt-BR",
  EN_US = "en-US",
}

export type LocaleType = `${Locales}`;

export type Locale = {
  months: string[];
  weekDays: string[];
  frequencies: { [key in Frequency]: string };
  frequency: string;
  every: string;
  day: string;
  week: string;
  month: string;
  year: string;
};
