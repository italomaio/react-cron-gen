import React, { forwardRef, ReactNode } from "react";
import { classPrefix, cn } from "@/utils";

import ChevronDown from "@/assets/chevron-down.svg";
import * as RadixSelect from "@radix-ui/react-select";
import type { SelectProps as RadixSelectProps } from "@radix-ui/react-select";

export type SelectClasses = {
  trigger: string;
  content: string;
  item: string;
};

export type SelectProps = {
  items: { label: string; value: string }[];
  label?: string;
  placeholder?: string;
  icon?: ReactNode;
  classes?: SelectClasses;
  style?: React.CSSProperties;
} & RadixSelectProps &
  React.ComponentPropsWithoutRef<"button">;

const defaultClasses: SelectClasses = {
  content: "",
  item: "",
  trigger: "",
};

const Select: React.ForwardRefExoticComponent<SelectProps> = forwardRef<
  React.ComponentRef<typeof RadixSelect.Trigger>,
  SelectProps
>(
  (
    {
      items,
      icon,
      value,
      style,
      disabled,
      onValueChange,
      placeholder = "Select an option",
      classes = defaultClasses,
      ...rest
    },
    ref
  ) => (
    <RadixSelect.Root onValueChange={onValueChange} value={value}>
      <RadixSelect.Trigger
        ref={ref}
        className={cn(classPrefix("select-trigger"), classes.trigger)}
        style={style}
        disabled={disabled}
        {...rest}
      >
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon>
          {icon ?? (
            <ChevronDown style={{ width: 8, height: 8, opacity: 0.5 }} />
          )}
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content
          position="popper"
          className={cn(classPrefix("select-content"), classes.trigger)}
        >
          <RadixSelect.ScrollUpButton />
          <RadixSelect.Viewport>
            {items?.map((item) => (
              <RadixSelect.Item
                key={item.value}
                value={item.value}
                className={cn(classPrefix("select-item"), classes.trigger)}
                aria-label={item.label}
              >
                <RadixSelect.ItemText>{item.label}</RadixSelect.ItemText>
                <RadixSelect.ItemIndicator />
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton />
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
);

Select.displayName = "Select";

export default Select;
