import { Input } from "@/components";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";

describe("Input", () => {
  const onChangeMock = vi.fn();

  test("Should render as expect", () => {
    const { container } = render(<Input />);
    expect(container).toBeInTheDocument();
  });

  test("Should render as correct type and classNames", () => {
    render(<Input type="password" className="teste" />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "password");
    expect(input).toHaveClass("react-cron-gen__input");
    expect(input).toHaveClass("teste");
  });

  test("Should call onChange function when fill input", async () => {
    render(<Input onChange={onChangeMock} />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "abc");
    expect(onChangeMock).toHaveBeenCalledTimes(3);
    expect(onChangeMock.mock.calls[2][0].target.value).toBe("abc");
  });

  test("forwardRef points to input", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
