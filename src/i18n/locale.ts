import { Locale, Locales, LocaleType } from "@/domain/types";

import pt from "@/i18n/source/pt-br.json";
import en from "@/i18n/source/en.json";

export const getLocaleData = (locale: LocaleType): Locale =>
  ({
    [Locales.PT_BR]: pt,
    [Locales.EN_US]: en,
  }[locale]);
