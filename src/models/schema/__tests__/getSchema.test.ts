import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.211.0/assert/mod.ts";
import { schemaMockData } from "../../mainRelations/__test__/getMainRelations.test.ts";
import { getSchema } from "../getSchema.ts";

Deno.test({
  name: "getSchema should return schemaMockData from schemaMockData",
  fn() {
    assertEquals(getSchema(schemaMockData, "country"), schemaMockData.country);
  },
});

Deno.test({
  name: "getSchema should throw err when schema does not exist",
  fn() {
    const getNotSchema = () => getSchema(schemaMockData, "notCountry");
    assertThrows(getNotSchema, Error, "Schema notCountry not found");
  },
});
