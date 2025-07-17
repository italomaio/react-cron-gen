import { Fields, Frequency } from "@/domain/types";

export interface IFormatter {
  format: (values: Fields, frequency?: Frequency) => string;
}
