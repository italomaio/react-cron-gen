import { FormatterFactory } from "./FormatterFactory";

describe("FormatterFactory", () => {
  test("Should return formatter instance", () => {
    const formatter = FormatterFactory.create("unix");
    expect(formatter).toBeDefined();
  });
});
