import {
  assertExists,
  assertEquals,
} from "https://deno.land/std@0.130.0/testing/asserts.ts";
import { object, string } from "../../npmDeps.ts";
import { mockActs } from "./actMockData.ts";
import { setService } from "../setService.ts";

Deno.test({
  name: "setService creates service within mockActs",
  fn() {
    setService(mockActs, "anbar", {
      posts: {
        getPosts: {
          validator: object({ title: string() }),
          fn: () => ({ title: "nothing" }),
        },
      },
    });
    assertExists(mockActs.anbar);
  },
});

Deno.test({
  name: "setService creates service within mockActs",
  fn() {
    setService(mockActs, "anbar", "testing");
    assertEquals(mockActs.anbar, "testing");
  },
});
