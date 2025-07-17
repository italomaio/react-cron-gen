import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, MockedFunction } from "vitest";
import { UseCronGenProps } from "@/hooks";
import CronGen from "./CronGen";

const mockSetField = vi.fn();
const mockSetFrequency = vi.fn();

vi.mock("@/hooks", async (importOriginal) => {
  const mod = await importOriginal<typeof import("@/hooks")>();
  return {
    ...mod,
    useCronGen: vi.fn(),
  };
});

vi.mock("@/components", async (importOriginal) => {
  const mod = await importOriginal<typeof import("@/components")>();
  return {
    ...mod,
    Select: vi.fn(
      ({ value, onValueChange, items, placeholder, classes, ...props }) => (
        <select
          {...props}
          data-testid="select-mock"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          aria-label={placeholder || "frequencia"}
          className={classes?.select}
        >
          {items.map((item: { value: string; label: string }) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      )
    ),
    Input: vi.fn(({ value, onChange, ...props }) => (
      <input value={value || ""} onChange={onChange} {...props} />
    )),
  };
});

vi.mock("@/domain/parsers/TimeParser", () => ({
  TimeParser: {
    format: vi.fn(({ hour, minute }) => `${hour}:${minute}`),
    parse: vi.fn((time) => {
      const [hour, minute] = time.split(":");
      return { hour, minute };
    }),
  },
}));

const { useCronGen } = await import("@/hooks");
const mockedUseCronGen = useCronGen as MockedFunction<
  (props: UseCronGenProps) => unknown
>;

describe("CronGen Component", () => {
  const baseMockData = {
    setField: mockSetField,
    setFrequency: mockSetFrequency,
    data: {
      frequencies: {
        minutely: "A cada minuto",
        hourly: "Por hora",
        daily: "Diariamente",
        weekly: "Semanalmente",
        monthly: "Mensalmente",
      },
      weekDays: ["Domingo", "Segunda", "Terça"],
      months: ["Janeiro", "Fevereiro", "Março"],
      minutes: "Minutos",
      hours: "Horas",
      weekDay: "Dia da semana",
      month: "Mês",
      monthDay: "Dia do mês",
    },
    state: {
      values: {
        minute: "",
        hour: "",
        dayOfWeek: "",
        dayOfMonth: "",
        month: "",
      },
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseCronGen.mockReturnValue({
      ...baseMockData,
      frequency: "daily",
    });
  });

  it("should render the frequency selector and change frequency on select", () => {
    render(
      <CronGen
        classes={{
          select: {
            trigger: "class-trigger",
            content: "class-content",
            item: "class-item",
          },
        }}
        locale="pt-BR"
        type="unix"
      />
    );

    const frequencySelect = screen.getByRole("combobox", {
      name: /frequencia/i,
    });
    expect(frequencySelect).toBeInTheDocument();

    fireEvent.change(frequencySelect, { target: { value: "weekly" } });

    expect(mockSetFrequency).toHaveBeenCalledWith("weekly");
  });

  it("should render only the minute input for 'minutely' frequency", () => {
    mockedUseCronGen.mockReturnValue({
      ...baseMockData,
      frequency: "minutely",
    });

    render(<CronGen locale="pt-BR" type="unix" />);

    const minuteInput = screen.getByPlaceholderText("Minutos");
    expect(minuteInput).toBeInTheDocument();

    fireEvent.change(minuteInput, { target: { value: "30" } });
    expect(mockSetField).toHaveBeenCalledWith("minute", "30");

    expect(screen.queryByPlaceholderText("Horas")).not.toBeInTheDocument();
    expect(
      screen.queryByPlaceholderText("Dia da semana")
    ).not.toBeInTheDocument();
  });

  it("should render only the hour input for 'hourly' frequency", () => {
    mockedUseCronGen.mockReturnValue({
      ...baseMockData,
      frequency: "hourly",
    });

    render(<CronGen locale="pt-BR" type="unix" />);

    const hourInput = screen.getByPlaceholderText("Horas");
    expect(hourInput).toBeInTheDocument();

    fireEvent.change(hourInput, { target: { value: "10" } });
    expect(mockSetField).toHaveBeenCalledWith("hour", "10");
  });

  it("should render time input for 'daily' frequency", () => {
    mockedUseCronGen.mockReturnValue({
      ...baseMockData,
      frequency: "daily",
      state: { values: { hour: "14", minute: "30" } },
    });
    render(<CronGen locale="pt-BR" type="unix" />);

    const timeInput = screen.getByDisplayValue("14:30");
    expect(timeInput).toBeInTheDocument();
    expect(timeInput).toHaveAttribute("type", "time");

    fireEvent.change(timeInput, { target: { value: "15:45" } });

    expect(mockSetField).toHaveBeenCalledWith("minute", "45");
    expect(mockSetField).toHaveBeenCalledWith("hour", "15");
  });

  it("should render day of week and time inputs for 'weekly' frequency", () => {
    mockedUseCronGen.mockReturnValue({
      ...baseMockData,
      frequency: "weekly",
      state: { values: { dayOfWeek: "1", hour: "09", minute: "00" } },
    });
    render(<CronGen locale="pt-BR" type="unix" />);

    const dayOfWeekSelect = screen.getByRole("combobox", {
      name: /dia da semana/i,
    });
    expect(dayOfWeekSelect).toBeInTheDocument();
    expect(dayOfWeekSelect).toHaveValue("1");

    const timeInput = screen.getByDisplayValue("09:00");
    expect(timeInput).toBeInTheDocument();

    fireEvent.change(dayOfWeekSelect, { target: { value: "2" } });
    expect(mockSetField).toHaveBeenCalledWith("dayOfWeek", "2");
  });

  it("should render month, day of month and time inputs for 'monthly' frequency", () => {
    mockedUseCronGen.mockReturnValue({
      ...baseMockData,
      frequency: "monthly",
      state: {
        values: { month: "1", dayOfMonth: "15", hour: "10", minute: "20" },
      },
    });
    const { debug } = render(<CronGen locale="pt-BR" type="unix" />);
    debug();

    const monthSelect = screen.getByRole("combobox", { name: "Mês" });
    expect(monthSelect).toBeInTheDocument();
    expect(monthSelect).toHaveValue("1");

    const dayOfMonthSelect = screen.getByRole("combobox", {
      name: "Dia do mês",
    });
    expect(dayOfMonthSelect).toBeInTheDocument();
    expect(dayOfMonthSelect).toHaveValue("15");

    const timeInput = screen.getByDisplayValue("10:20");
    expect(timeInput).toBeInTheDocument();

    fireEvent.change(monthSelect, { target: { value: "2" } });
    expect(mockSetField).toHaveBeenCalledWith("month", "2");
  });
});
