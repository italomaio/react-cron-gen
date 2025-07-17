import { render, screen } from "@testing-library/react";
import { Select } from "@/components";
import userEvent from "@testing-library/user-event";

describe("Select", () => {
  window.HTMLElement.prototype.hasPointerCapture = vi.fn();
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
  const mockOnChange = vi.fn();

  const selectItems = [
    {
      label: "italo",
      value: "1",
    },
  ];

  test("Should render as expect", () => {
    const { container } = render(<Select items={selectItems} />);
    expect(container).toBeInTheDocument();
  });

  test("Should render with custom icon", () => {
    const { container } = render(
      <Select icon={<>ArrowDown</>} items={selectItems} />
    );
    expect(container).toBeInTheDocument();
  });

  test("Should render with custom classes", () => {
    render(
      <Select
        classes={{
          trigger: "custom-trigger-class",
          content: "",
          item: "",
        }}
        items={selectItems}
      />
    );
    expect(screen.getByRole("combobox")).toHaveClass("custom-trigger-class");
  });

  test("Should open items when click", async () => {
    render(<Select items={selectItems} />);
    const combobox = screen.getByRole("combobox");
    await userEvent.click(combobox);

    const listbox = screen.getByRole("listbox");
    expect(listbox).toBeInTheDocument();
  });

  test("Should call onChange when select item", async () => {
    render(<Select onValueChange={mockOnChange} items={selectItems} />);
    const combobox = screen.getByRole("combobox");
    await userEvent.click(combobox);

    const listbox = screen.getByRole("listbox");
    expect(listbox).toBeInTheDocument();

    const item = screen.getAllByRole("option")[0];
    await userEvent.click(item);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith("1");
  });
});
