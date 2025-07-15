export interface IParser<I, O> {
  parse(value: I): O;
}
