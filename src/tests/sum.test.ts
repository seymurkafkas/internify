import { sum } from "./sum";

test("basic", () => {
  expect(sum(3, 4)).toBe(7);
});

test("basic again", () => {
  expect(sum(1, 2)).toBe(3);
});
