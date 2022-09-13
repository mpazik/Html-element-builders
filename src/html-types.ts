import type {
  HTMLAttributes,
  HTMLElementsAttributes,
} from "./standard-html-types";

interface CustomAttributes {
  dataSet?: DOMStringMap | undefined;
}

export type HtmlTag = keyof HTMLElementsAttributes;
export type ElementAttributes<T extends HtmlTag> = HTMLElementsAttributes[T] &
  CustomAttributes;

export type CustomHtmlTag = string;
export type CustomElementAttributes = HTMLAttributes & CustomAttributes;

export type HtmlChild = HTMLElement | string;
