import { ReactNode, useMemo } from "react";
import { useCronGen, UseCronGenProps } from "@/hooks";
import { Frequency } from "@/domain/types";
import { Select, type SelectClasses, Input } from "@/components";
import { monthDays } from "@/utils";

export type CronGronProps = Pick<UseCronGenProps, "locale" | "type"> & {
  classes?: {
    select?: SelectClasses;
  };
};

const CronGen: React.FC<CronGronProps> = ({
  classes,
  locale = "en-US",
  type = "unix",
}) => {
  const { setField, setFrequency, state, data, frequency } = useCronGen({
    locale,
    type,
  });

  const frequenciesItems = useMemo(
    () =>
      Object.entries(data.frequencies).map(([key, value], i) => ({
        label: value,
        value: key,
      })),
    [data.frequencies]
  );

  const monthsItems = useMemo(
    () =>
      data.months.map((value, index) => ({
        label: value,
        value: index.toString(),
      })),
    []
  );

  const daysOfWeekItems = useMemo(
    () =>
      data.weekDays.map((value, index) => ({
        label: value,
        value: index.toString(),
      })),
    []
  );

  const daysOfMonthItems = useMemo(
    () =>
      Array.from({
        length: monthDays(Number(state.values.month) + 1),
      }).map((value, index) => ({
        label: String(index + 1),
        value: String(index + 1),
      })),
    [state.values.month]
  );

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: frequency === "monthly" ? "column" : "row",
        gap: "0.5rem",
      }}
    >
      <Select
        style={{ flex: 1, width: frequency === "monthly" ? "100%" : "auto" }}
        classes={classes.select}
        value={frequency}
        onValueChange={(value) => setFrequency(value as Frequency)}
        items={frequenciesItems}
      />

      <div style={{ display: "flex", flexDirection: "row", gap: "0.5rem" }}>
        {["minutely"].some((x) => x === frequency) && (
          <Input
            type="number"
            value={state.values.minute}
            onChange={(e) => setField("minute", e.target.value)}
          />
        )}

        {["hourly"].some((x) => x === frequency) && (
          <Input
            type="number"
            value={state.values.minute}
            onChange={(e) => setField("hour", e.target.value)}
          />
        )}

        {["weekly"].some((x) => x === frequency) && (
          <Select
            classes={classes.select}
            value={state.values.dayOfWeek}
            items={daysOfWeekItems}
            onValueChange={(value) => setField("dayOfWeek", value)}
          />
        )}

        {["monthly"].some((x) => x === frequency) && (
          <Select
            classes={classes.select}
            value={state.values.month}
            items={monthsItems}
            style={{ flex: 1 }}
            onValueChange={(value) => setField("month", value)}
          />
        )}

        {["monthly"].some((x) => x === frequency) && (
          <Select
            classes={classes.select}
            value={state.values.dayOfMonth}
            onValueChange={(value) => setField("dayOfMonth", value)}
            disabled={!state.values.month}
            items={daysOfMonthItems}
          />
        )}

        {["daily", "weekly", "monthly"].some((x) => x === frequency) && (
          <Input type="time" />
        )}
      </div>
    </div>
  );
};

export default CronGen;
