import { TimeParser } from "./TimeParser";

describe("TimeParser", () => {
  test("Should parse time correctly", () => {
    const timeParsed = TimeParser.parse("13:30");
    expect(timeParsed).toStrictEqual({ hour: "13", minute: "30" });
  });

  test("Should format time correctly", () => {
    const timeFormatted = TimeParser.format({ hour: "13", minute: "30" });
    expect(timeFormatted).toEqual("13:30");
  });
});
