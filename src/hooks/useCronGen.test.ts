import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { IFormatter } from "@/domain/interfaces/IFormatter";
import { Frequency } from "@/domain/types";

import useCronGen from "./useCronGen";

const mockFormat = vi.fn(
  (values, frequency) => `formatted:${frequency}:${JSON.stringify(values)}`
);

const mockParse = vi.fn((expression) => {
  if (!expression) return null;
  return {
    values: {},
    frequency: "hourly" as Frequency,
  };
});

vi.mock("@/domain/formatters/FormatterFactory", () => ({
  FormatterFactory: {
    create: vi.fn(
      (): IFormatter => ({
        format: mockFormat,
        parse: mockParse,
      })
    ),
  },
}));

vi.mock("@/i18n/locale", () => ({
  getLocaleData: vi.fn(() => ({
    frequency: "Frequência",
    hourly: "Por Hora",
  })),
}));

const { FormatterFactory } = await import(
  "@/domain/formatters/FormatterFactory"
);

const { getLocaleData } = await import("@/i18n/locale");

describe("useCronGen Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockParse.mockReturnValue({
      values: {},
      frequency: "hourly" as Frequency,
    });
  });

  it("should return the correct initial state", () => {
    const { result } = renderHook(() =>
      useCronGen({ type: "unix", locale: "pt-BR" })
    );

    expect(result.current.frequency).toBe("hourly");
    expect(result.current.state.expression).toBe("");
    expect(result.current.state.values).toEqual({
      dayOfMonth: undefined,
      hour: undefined,
      dayOfWeek: undefined,
      minute: undefined,
      month: undefined,
      second: undefined,
      year: undefined,
    });

    expect(FormatterFactory.create).toHaveBeenCalledWith("unix");
    expect(getLocaleData).toHaveBeenCalledWith("pt-BR");
    expect(result.current.data.frequency).toBe("Frequência");
  });

  it("should update frequency and reset values when setFrequency is called", () => {
    const { result } = renderHook(() =>
      useCronGen({ type: "unix", locale: "en-US" })
    );

    act(() => {
      result.current.setFrequency("daily");
    });

    expect(result.current.frequency).toBe("daily");
    expect(result.current.state.values).toEqual({});

    expect(mockFormat).toHaveBeenCalledWith({}, "daily");
    expect(result.current.state.expression).toBe("formatted:daily:{}");
  });

  it("should update a field value and the expression when setField is called", () => {
    const { result } = renderHook(() =>
      useCronGen({ type: "unix", locale: "en-US" })
    );

    act(() => {
      result.current.setField("minute", "30");
    });

    expect(result.current.state.values?.minute).toBe("30");

    const expectedValues = { minute: "30" };
    expect(mockFormat).toHaveBeenCalledWith(
      expect.objectContaining(expectedValues),
      "hourly"
    );

    act(() => {
      result.current.setField("hour", "10");
    });

    const finalExpectedValues = { minute: "30", hour: "10" };
    expect(result.current.state.values).toEqual(
      expect.objectContaining(finalExpectedValues)
    );
    expect(mockFormat).toHaveBeenCalledWith(
      expect.objectContaining(finalExpectedValues),
      "hourly"
    );
  });

  it("should not update state if setField is called with a falsy field", () => {
    const { result } = renderHook(() =>
      useCronGen({ type: "unix", locale: "en-US" })
    );

    const initialState = result.current.state;

    act(() => {
      result.current.setField(null, "some-value");
    });

    expect(result.current.state).toBe(initialState);
    expect(mockFormat).not.toHaveBeenCalled();
  });

  it("should parse defaultValue and set initial state", () => {
    mockParse.mockReturnValueOnce({
      values: { minute: "30", hour: "10" },
      frequency: "daily" as Frequency,
    });

    const { result } = renderHook(() =>
      useCronGen({ type: "unix", defaultValue: "30 10 * * *" })
    );

    expect(mockParse).toHaveBeenCalledWith("30 10 * * *");
    expect(result.current.frequency).toBe("daily");
    expect(result.current.state.values).toEqual({
      minute: "30",
      hour: "10",
    });
    expect(result.current.state.expression).toBe("30 10 * * *");
  });

  it("should fallback to default state when defaultValue is invalid", () => {
    mockParse.mockReturnValueOnce(null);

    const { result } = renderHook(() =>
      useCronGen({ type: "unix", defaultValue: "invalid" })
    );

    expect(result.current.frequency).toBe("hourly");
    expect(result.current.state.expression).toBe("");
    expect(result.current.state.values).toEqual({
      dayOfMonth: undefined,
      hour: undefined,
      dayOfWeek: undefined,
      minute: undefined,
      month: undefined,
      second: undefined,
      year: undefined,
    });
  });

  it("should fallback to default state when defaultValue is empty string", () => {
    const { result } = renderHook(() =>
      useCronGen({ type: "unix", defaultValue: "" })
    );

    expect(result.current.frequency).toBe("hourly");
    expect(result.current.state.expression).toBe("");
  });
});
