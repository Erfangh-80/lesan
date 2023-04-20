import { ISchema, schemaFns } from "../mod.ts";

/**
 * get pure features of one schema
 * @param name - name of schema that we want to get pure feature
 */
export const getPureModel = (schemasObj: ISchema, name: string) => {
  const schemas = schemaFns(schemasObj).getSchemas();
  return schemas[name]?.pure;
};
