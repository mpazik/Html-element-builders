import type { HTMLElementsAttributes } from "./standard-html-types";

interface CustomAttributes {
  dataSet?: DOMStringMap | undefined;
}

export type ElementAttributes<T extends HtmlTag> = HTMLElementsAttributes[T] &
  CustomAttributes;

export type HtmlTag = keyof HTMLElementsAttributes;
