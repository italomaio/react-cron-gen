import { useCallback, useEffect, useMemo, useState } from "react";
import { getLocaleData } from "@/i18n/locale";
import { FormatterFactory } from "@/domain/formatters/FormatterFactory";
import { IFormatter } from "@/domain/interfaces/IFormatter";

import {
  CronField,
  ExpressionType,
  Fields,
  Frequency,
  Locale,
  LocaleType,
} from "@/domain/types";

export type UseCronGenProps = {
  type: ExpressionType;
  locale: LocaleType;
};

export type UseCronGenState = {
  expression: string;
  values?: Fields;
  frequency: Frequency;
};

export type UseCronGenResult = {
  data: Locale;
  frequency: Frequency;
  state: UseCronGenState;
  setField: (field: CronField, value: string) => void;
  setFrequency: (value: Frequency) => void;
};

const defaultValues: Fields = {
  dayOfMonth: undefined,
  hour: undefined,
  dayOfWeek: undefined,
  minute: undefined,
  month: undefined,
  second: undefined,
  year: undefined,
};

const useCronGen = ({
  type = "unix",
  locale = "en-US",
}: UseCronGenProps): UseCronGenResult => {
  const [state, setState] = useState<UseCronGenState>({
    expression: "",
    frequency: "hourly",
    values: defaultValues,
  });

  const formatter: IFormatter = useMemo(
    () => FormatterFactory.create(type),
    [type]
  );

  const setField = useCallback(
    (field: CronField, value: string) => {
      if (!field) return;

      setState((prev) => {
        const values = { ...prev.values, [field]: value };
        return {
          ...prev,
          values,
          expression: formatter.format(values, frequency),
        };
      });
    },
    [state.values]
  );

  const setFrequency = useCallback(
    (frequency: Frequency) => {
      setState(() => ({
        frequency,
        values: {},
        expression: formatter.format({}),
      }));
    },
    [state]
  );

  const data: Locale = useMemo(() => getLocaleData(locale), [locale]);

  const frequency: Frequency = useMemo(
    () => state.frequency,
    [state.frequency]
  );

  useEffect(() => {
    console.count("useCronGen Count: ");
    console.log("useCronGen State: ", state);
  }, [state]);

  return {
    data,
    state,
    frequency,
    setField,
    setFrequency,
  };
};

export default useCronGen;
