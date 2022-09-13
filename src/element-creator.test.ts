import { createElement, createElementFromHtmlString } from "./index";

const check = (input: Element, result: string) => () =>
  expect(input.outerHTML).toEqual(result);

describe("createElementFromHtml should", () => {
  test(
    "build single element",
    check(
      createElementFromHtmlString("<div>Test<p>Hi</p></div>"),
      "<div>Test<p>Hi</p></div>"
    )
  );

  test("throw on multiple elements", () => {
    expect(() =>
      createElementFromHtmlString("<div>Test<p>Hi</p></div><div>Test</div>")
    ).toThrow();
  });
});

describe("createElement should build", () => {
  test("simple element", check(createElement("div"), "<div></div>"));
  test(
    "element with text",
    check(createElement("div", "text"), "<div>text</div>")
  );
  test(
    "element with id",
    check(createElement("div", { id: "test" }), '<div id="test"></div>')
  );
  test(
    "element with attribute",
    check(createElement("div", { title: "test" }), '<div title="test"></div>')
  );
  test(
    "element with class",
    check(
      createElement("div", { class: "my-class" }),
      '<div class="my-class"></div>'
    )
  );
  test(
    "element with undefined class",
    check(createElement("div", { class: undefined }), "<div></div>")
  );
  test(
    "element with null attribute",
    check(createElement("div", { class: null }), "<div></div>")
  );
  test(
    "element with two classes",
    check(
      createElement("div", { class: "my-class your-class" }),
      '<div class="my-class your-class"></div>'
    )
  );
  test(
    "element with duplicated class",
    check(
      createElement("div", { class: "my-class my-class" }),
      '<div class="my-class"></div>'
    )
  );
  test(
    "element with children",
    check(
      createElement("div", "parent", createElement("div", "child")),
      "<div>parent<div>child</div></div>"
    )
  );
  test(
    "style",
    check(
      createElement("div", { style: { width: "100px", left: "50px" } }),
      '<div style="width: 100px; left: 50px;"></div>'
    )
  );
  test(
    "element with boolean attribute",
    // in real dom it would become <div hidden></div>
    check(createElement("div", { hidden: true }), '<div hidden=""></div>')
  );
  test(
    "element with boolean attribute set to false",
    check(createElement("div", { hidden: false }), "<div></div>")
  );
  test(
    "element with explicit boolean attribute",
    check(
      createElement("div", { draggable: true }),
      '<div draggable="true"></div>'
    )
  );
  test(
    "element with explicit boolean attribute set to false",
    check(createElement("div", { draggable: false }), "<div></div>")
  );
  test(
    "element with custom data attributes",
    check(
      createElement("div", { dataSet: { id: "test", name: "something" } }),
      '<div data-id="test" data-name="something"></div>'
    )
  );

  test("event handler", () => {
    const calls: string[] = [];
    const result = createElement("div", { onClick: () => calls.push("click") });
    (result as HTMLElement).click();
    expect(calls).toHaveLength(1);
  });
});
