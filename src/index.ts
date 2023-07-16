import type { HtmlNode } from "./html-types";

export {
  createElement,
  createCustomElement,
  createElementFromHtmlString,
  dangerousHtml,
  appendHtmlNode,
  renderHtmlNode,
  createRenderer,
  setAttributes,
  withAttributes,
} from "./element-creator";

export * from "./html-builders";
export type { HtmlNode } from "./html-types";

export const isHtmlNode = (node: HtmlNode): node is HTMLElement => {
  return (
    node instanceof HTMLElement ||
    typeof node === "string" ||
    node === undefined ||
    (Array.isArray(node) && node.every(isHtmlNode))
  );
};
