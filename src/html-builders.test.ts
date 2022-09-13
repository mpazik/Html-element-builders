import { createCustomElementBuilder } from "./html-builders";

const check = (input: Element, result: string) =>
  expect(input.outerHTML).toEqual(result);

describe("createCustomElementBuilder should", () => {
  test("build single element", () => {
    const customElement = createCustomElementBuilder<{
      prop: string;
      num: number;
    }>("custom-element");

    check(
      customElement({ prop: "test", num: 4 }, "child"),
      `<custom-element prop="test" num="4">child</custom-element>`
    );
  });
});
