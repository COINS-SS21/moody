import produce, { Draft } from "immer";

export function createModelFromPlain<Type extends { id: string }>(
  model: { new (plain: Type): Type },
  plain: Type
): Type {
  return produce(new model(plain), (model: Draft<Type>) => {
    model.id = plain.id;
  });
}
