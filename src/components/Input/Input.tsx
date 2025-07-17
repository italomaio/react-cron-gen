import { classPrefix, cn } from "@/utils";
import { forwardRef } from "react";

export type InputProps = {} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", onChange, ...rest }, ref) => (
    <input
      role="textbox"
      ref={ref}
      type={type}
      onChange={onChange}
      className={cn(classPrefix("input"), className)}
      {...rest}
    />
  )
);

Input.displayName = "Input";

export default Input;
