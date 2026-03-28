import { useCallback, useMemo, useState } from "react";
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
  type?: ExpressionType;
  locale?: LocaleType;
  defaultValue?: string;
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

const defaultFields: Fields = {
  dayOfMonth: undefined,
  hour: undefined,
  dayOfWeek: undefined,
  minute: undefined,
  month: undefined,
  second: undefined,
  year: undefined,
};

const getInitialState = (
  formatter: IFormatter,
  defaultValue?: string
): UseCronGenState => {
  if (!defaultValue) {
    return {
      expression: "",
      frequency: "hourly",
      values: defaultFields,
    };
  }

  const parsed = formatter.parse(defaultValue);

  if (!parsed) {
    return {
      expression: "",
      frequency: "hourly",
      values: defaultFields,
    };
  }

  return {
    expression: defaultValue,
    frequency: parsed.frequency,
    values: parsed.values,
  };
};

const useCronGen = ({
  type = "unix",
  locale = "en-US",
  defaultValue,
}: UseCronGenProps): UseCronGenResult => {
  const formatter: IFormatter = useMemo(
    () => FormatterFactory.create(type),
    [type]
  );

  const [state, setState] = useState<UseCronGenState>(() =>
    getInitialState(formatter, defaultValue)
  );

  const setField = useCallback(
    (field: CronField, value: string) => {
      if (!field) return;

      setState((prev) => {
        const values = { ...prev.values, [field]: value };
        return {
          ...prev,
          values,
          expression: formatter.format(values, prev.frequency),
        };
      });
    },
    [formatter]
  );

  const setFrequency = useCallback(
    (frequency: Frequency) => {
      setState(() => ({
        frequency,
        values: {},
        expression: formatter.format({}, frequency),
      }));
    },
    [formatter]
  );

  const data: Locale = useMemo(() => getLocaleData(locale), [locale]);

  const frequency: Frequency = useMemo(
    () => state.frequency,
    [state.frequency]
  );

  return {
    data,
    state,
    frequency,
    setField,
    setFrequency,
  };
};

export default useCronGen;
