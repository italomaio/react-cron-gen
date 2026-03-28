import { Fields, Frequency } from "@/domain/types";

export interface ParseOutput {
  values: Fields;
  frequency: Frequency;
}

export interface IFormatter {
  format: (values: Fields, frequency?: Frequency) => string;
  parse: (expression: string) => ParseOutput | null;
}
