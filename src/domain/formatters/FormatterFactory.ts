import { IFormatter } from "@/domain/interfaces/IFormatter";
import { ExpressionType } from "@/domain/types";
import { UnixFormatter } from "@/domain/formatters/UnixFormatter";

export class FormatterFactory {
  static create(expressionType: ExpressionType): IFormatter {
    const mapper: { [key in ExpressionType]: IFormatter } = {
      unix: new UnixFormatter(),
      quartz: undefined,
    };

    return mapper[expressionType];
  }
}
