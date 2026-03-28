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
      "0 */4 * * *"
    );
  });

  describe("parse", () => {
    const formatter = new UnixFormatter();

    test("should return null for empty string", () => {
      expect(formatter.parse("")).toBeNull();
    });

    test("should return null for invalid expression", () => {
      expect(formatter.parse("invalid")).toBeNull();
    });

    test("should return null for too many fields", () => {
      expect(formatter.parse("* * * * * * *")).toBeNull();
    });

    test("should parse minutely expression", () => {
      const result = formatter.parse("*/15 * * * *");
      expect(result).not.toBeNull();
      expect(result?.frequency).toBe("minutely");
      expect(result?.values.minute).toBe("15");
    });

    test("should parse hourly expression", () => {
      const result = formatter.parse("0 */4 * * *");
      expect(result).not.toBeNull();
      expect(result?.frequency).toBe("hourly");
      expect(result?.values.hour).toBe("4");
    });

    test("should parse daily expression with time", () => {
      const result = formatter.parse("30 10 * * *");
      expect(result).not.toBeNull();
      expect(result?.frequency).toBe("daily");
      expect(result?.values.minute).toBe("30");
      expect(result?.values.hour).toBe("10");
    });

    test("should parse weekly expression with day of week", () => {
      const result = formatter.parse("30 10 * * 1");
      expect(result).not.toBeNull();
      expect(result?.frequency).toBe("weekly");
      expect(result?.values.dayOfWeek).toBe("1");
    });

    test("should parse monthly expression with month", () => {
      const result = formatter.parse("30 10 15 * *");
      expect(result).not.toBeNull();
      expect(result?.frequency).toBe("daily");
    });

    test("should parse monthly expression with day of month and month", () => {
      const result = formatter.parse("30 10 15 6 *");
      expect(result).not.toBeNull();
      expect(result?.frequency).toBe("monthly");
      expect(result?.values.dayOfMonth).toBe("15");
      expect(result?.values.month).toBe("6");
    });

    test("should handle wildcard values as undefined", () => {
      const result = formatter.parse("* * * * *");
      expect(result).not.toBeNull();
      expect(result?.values.minute).toBeUndefined();
      expect(result?.values.hour).toBeUndefined();
    });
  });
});
