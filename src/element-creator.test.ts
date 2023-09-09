import {
  createCustomElement,
  createElement,
  createElementFromHtmlString,
  dangerousHtml,
  withAttributes,
} from "./element-creator";

import { div, input, span } from "./index";

const check = (input: Element, result: string) =>
  expect(input.outerHTML).toEqual(result);

describe("createElementFromHtml should", () => {
  test("build single element", () =>
    check(
      createElementFromHtmlString("<div>Test<p>Hi</p></div>"),
      "<div>Test<p>Hi</p></div>"
    ));

  test("throw on multiple elements", () => {
    expect(() =>
      createElementFromHtmlString("<div>Test<p>Hi</p></div><div>Test</div>")
    ).toThrow();
  });
});

describe("createElement should build", () => {
  test("simple element", () => check(createElement("div"), "<div></div>"));

  test("element with text", () =>
    check(createElement("div", "text"), "<div>text</div>"));

  test("element with id", () =>
    check(createElement("div", { id: "test" }), '<div id="test"></div>'));

  test("element with attribute", () =>
    check(createElement("div", { title: "test" }), '<div title="test"></div>'));

  test("element with class", () =>
    check(
      createElement("div", { class: "my-class" }),
      '<div class="my-class"></div>'
    ));

  test("element with undefined class", () =>
    check(createElement("div", { class: undefined }), "<div></div>"));

  test("element with null attribute", () =>
    check(createElement("div", { class: null }), "<div></div>"));

  test("element with two classes", () =>
    check(
      createElement("div", { class: "my-class your-class" }),
      '<div class="my-class your-class"></div>'
    ));

  test("element with duplicated class", () =>
    check(
      createElement("div", { class: "my-class my-class" }),
      '<div class="my-class"></div>'
    ));

  test("element with list of classes", () =>
    check(
      createElement("div", { class: ["my-class", "my-class2"] }),
      '<div class="my-class my-class2"></div>'
    ));

  test("element with list of double classes", () =>
    check(
      createElement("div", {
        class: ["my-class my-class2", "my-class my-class3"],
      }),
      '<div class="my-class my-class2 my-class3"></div>'
    ));

  test("element with some undefined classes", () =>
    check(
      createElement("div", { class: [undefined, "my-class", undefined] }),
      '<div class="my-class"></div>'
    ));

  test("element with children", () =>
    check(div("parent", div("child")), "<div>parent<div>child</div></div>"));

  test("document fragment with html nodes", () => {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(span("child 1"));
    fragment.appendChild(span("child 2"));
    check(div(fragment), "<div><span>child 1</span><span>child 2</span></div>");
  });

  test("document fragment with text", () => {
    const fragment = document.createDocumentFragment();
    const text = document.createTextNode("child 1");
    fragment.appendChild(text);
    check(div(fragment), "<div>child 1</div>");
  });

  test("style", () =>
    check(
      createElement("div", { style: { width: "100px", left: "50px" } }),
      '<div style="width: 100px; left: 50px;"></div>'
    ));

  test("style as text", () =>
    check(
      createElement("div", { style: "width: 100px; left: 50px" }),
      '<div style="width: 100px; left: 50px;"></div>'
    ));

  test("element with boolean attribute", () =>
    // in real dom it would become <div hidden></div>
    check(createElement("div", { hidden: true }), '<div hidden=""></div>'));

  test("element with boolean attribute set to false", () =>
    check(createElement("div", { hidden: false }), "<div></div>"));

  test("element with explicit boolean attribute", () =>
    check(
      createElement("div", { draggable: true }),
      '<div draggable="true"></div>'
    ));

  test("element with explicit boolean attribute set to false", () =>
    check(createElement("div", { draggable: false }), "<div></div>"));

  test("element with custom data attributes", () =>
    check(
      div({ dataSet: { id: "test", name: "something" } }),
      '<div data-id="test" data-name="something"></div>'
    ));

  test("custom element", () =>
    check(
      createCustomElement("custom-element"),
      "<custom-element></custom-element>"
    ));

  test("custom element extending base element", () =>
    check(span({ is: "custom-element" }), `<span is="custom-element"></span>`));

  test("ignore undefined nodes", () =>
    check(
      div({ class: undefined }, undefined, "text", undefined),
      "<div>text</div>"
    ));

  test("render array of items", () =>
    check(
      div([undefined, "text", undefined, div("child")], "last"),
      "<div>text<div>child</div>last</div>"
    ));

  test("event handler", () => {
    const calls: string[] = [];
    const result = div({ onClick: () => calls.push("click") });
    (result as HTMLElement).click();
    expect(calls).toHaveLength(1);
  });
});

describe("dangerousHtml should", () => {
  test("render in an element", () =>
    check(div(dangerousHtml("<p>test</p>")), "<div><p>test</p></div>"));

  test("render multiple elements in an element", () =>
    check(
      div(dangerousHtml("<p>test</p><span>Hi</span>")),
      "<div><p>test</p><span>Hi</span></div>"
    ));
});

describe("withAttributes should", () => {
  test("add attributes", () =>
    check(
      withAttributes(div("text"), { id: "test", class: "my-class" }),
      `<div id="test" class="my-class">text</div>`
    ));

  test("merge classes", () =>
    check(
      withAttributes(div({ class: "first second" }, "text"), {
        class: "third",
      }),

      `<div class="first second third">text</div>`
    ));

  test("merge styles", () =>
    check(
      withAttributes(
        div({ style: { margin: "4px", border: "solid" } }, "text"),
        { style: { margin: "10px", padding: "4px" } }
      ),
      `<div style="margin: 10px; border: solid; padding: 4px;">text</div>`
    ));

  test("merge data attributes", () =>
    check(
      withAttributes(
        div({ dataSet: { numer: "5", text: "something" } }, "text"),
        { dataSet: { numer: "1", other: "else" } }
      ),
      `<div data-numer="1" data-text="something" data-other="else">text</div>`
    ));

  test("handle provided type", () => {
    const element = withAttributes(input({ value: "Test" }, "text"), {
      value: "test",
    });
    element.value = "New value";
    return check(element, `<input value="test">`);
  });
});
