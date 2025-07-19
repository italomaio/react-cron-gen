import { useEffect, useMemo } from "react";
import { useCronGen, UseCronGenProps, UseCronGenState } from "@/hooks";
import { Frequency } from "@/domain/types";
import { Select, type SelectClasses, Input } from "@/components";
import { monthDays } from "@/utils";
import { TimeParser } from "@/domain/parsers/TimeParser";
import { TimeParserOutput } from "@/domain/types/parsers";

export type CronGronProps = Pick<UseCronGenProps, "locale" | "type"> & {
  classes?: {
    select?: SelectClasses;
    input?: string;
  };
  onValueChange: (values: UseCronGenState) => void;
};

const CronGen: React.FC<CronGronProps> = ({
  classes,
  locale = "en-US",
  type = "unix",
  onValueChange,
}) => {
  const { setField, setFrequency, state, data, frequency } = useCronGen({
    locale,
    type,
  });

  const frequenciesItems = useMemo(
    () =>
      Object.entries(data.frequencies).map(([key, value]) => ({
        label: value,
        value: key,
      })),
    [data.frequencies]
  );

  const monthsItems = useMemo(
    () =>
      data.months.map((value, index) => ({
        label: value,
        value: (index + 1).toString(),
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
        length: monthDays(Number(state.values.month)),
      }).map((value, index) => ({
        label: String(index + 1),
        value: String(index + 1),
      })),
    [state.values.month]
  );

  const timeValue = useMemo(() => {
    if (!state.values.hour || !state.values.minute) return "";
    return TimeParser.format({
      hour: state.values?.hour as string,
      minute: state.values?.minute as string,
    });
  }, [frequency, state]);

  useEffect(() => {
    onValueChange(state);
  }, [state]);

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
        classes={classes?.select}
        value={frequency}
        onValueChange={(value) => setFrequency(value as Frequency)}
        items={frequenciesItems}
        placeholder={data.frequency}
        aria-placeholder={data.selectFrequency}
        aria-label={data.frequency}
      />

      <div style={{ display: "flex", flexDirection: "row", gap: "0.5rem" }}>
        {["minutely"].some((x) => x === frequency) && (
          <Input
            type="number"
            value={state.values.minute}
            onChange={(e) => setField("minute", e.target.value)}
            placeholder={data.minutes}
            aria-placeholder={data.fillMinutes}
            aria-label={data.minutes}
            className={classes.input}
          />
        )}

        {["hourly"].some((x) => x === frequency) && (
          <Input
            type="number"
            value={state.values.minute}
            onChange={(e) => setField("hour", e.target.value)}
            placeholder={data.hours}
            aria-placeholder={data.fillHours}
            aria-label={data.hours}
            className={classes.input}
          />
        )}

        {["weekly"].some((x) => x === frequency) && (
          <Select
            classes={classes?.select}
            value={state.values.dayOfWeek}
            items={daysOfWeekItems}
            onValueChange={(value) => setField("dayOfWeek", value)}
            placeholder={data.weekDay}
            aria-placeholder={data.selectDayOfWeek}
            aria-label={data.weekDay}
          />
        )}

        {["monthly"].some((x) => x === frequency) && (
          <Select
            classes={classes?.select}
            value={state.values.month}
            items={monthsItems}
            style={{ flex: 1 }}
            onValueChange={(value) => setField("month", value)}
            placeholder={data.month}
            aria-placeholder={data.selectDayOfMonth}
            aria-label={data.month}
          />
        )}

        {["monthly"].some((x) => x === frequency) && (
          <Select
            classes={classes?.select}
            value={state.values.dayOfMonth}
            onValueChange={(value) => setField("dayOfMonth", value)}
            disabled={!state.values.month}
            items={daysOfMonthItems}
            placeholder={data.monthDay}
            aria-placeholder={data.selectDayOfMonth}
            aria-label={data.monthDay}
          />
        )}

        {["daily", "weekly", "monthly"].some((x) => x === frequency) && (
          <Input
            type="time"
            value={timeValue}
            onChange={(e) => {
              if (e.target.value.length !== 5) return;

              const { hour, minute } = TimeParser.parse(
                e.target.value
              ) as TimeParserOutput;

              setField("minute", minute);
              setField("hour", hour);
            }}
            className={classes.input}
          />
        )}
      </div>
    </div>
  );
};

export default CronGen;
