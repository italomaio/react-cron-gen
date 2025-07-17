import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { IFormatter } from "@/domain/interfaces/IFormatter";

import useCronGen from "./useCronGen";

const mockFormat = vi.fn(
  (values, frequency) => `formatted:${frequency}:${JSON.stringify(values)}`
);

vi.mock("@/domain/formatters/FormatterFactory", () => ({
  FormatterFactory: {
    create: vi.fn(
      (): IFormatter => ({
        format: mockFormat,
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

    expect(mockFormat).toHaveBeenCalledWith({});
    expect(result.current.state.expression).toBe("formatted:undefined:{}");
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
});
