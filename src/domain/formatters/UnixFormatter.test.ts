import { UnixFormatter } from "@/domain/formatters/UnixFormatter";

describe("UnixFormatter", () => {
  const fields = {
    minute: "*",
    hour: "*",
    dayOfMonth: null,
    month: "*",
    dayOfWeek: "*",
  };

  test("Should return object fully filled", () => {
    const formatter = new UnixFormatter();
    expect(formatter.format(fields)).toEqual("* * * * *");
  });

  test("Should return minutely cron expression", () => {
    const formatter = new UnixFormatter();
    expect(formatter.format({ ...fields, minute: "15" }, "minutely")).toEqual(
      "*/15 * * * *"
    );
  });

  test("Should return hourly cron expression", () => {
    const formatter = new UnixFormatter();
    expect(formatter.format({ ...fields, hour: "4" }, "hourly")).toEqual(
      "* */4 * * *"
    );
  });
});
