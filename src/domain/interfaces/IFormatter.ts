import { Fields } from "@/domain/types";

export interface IFormatter {
  format: (values: Fields) => string;
}
