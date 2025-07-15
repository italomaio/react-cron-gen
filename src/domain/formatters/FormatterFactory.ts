import { IFormatter } from "@/domain/interfaces/IFormatter";
import { ExpressionType } from "@/domain/types";
import { UnixFormatter } from "@/domain/formatters/UnixFormatter";

export class FormatterFactory {
  static create(expressionType: ExpressionType): IFormatter {
    return new UnixFormatter();
  }
}
