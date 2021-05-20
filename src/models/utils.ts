import produce, { Draft } from "immer";

export function createModelFromPlain<Type>(
  model: new (plain: Type) => Type,
  plain: Type
): Type {
  return produce(new model(plain), (model: Draft<Type>) => {
    // @ts-ignore
    model.id = plain.id;
    // @ts-ignore
    model._deleted = plain._deleted;
    // @ts-ignore
    model._lastChangedAt = plain._lastChangedAt;
    // @ts-ignore
    model._version = plain._version;
  });
}
