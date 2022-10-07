import type {
  CustomElementAttributes,
  ElementAttributes,
  HtmlNode,
  HtmlTag,
} from "./html-types";

const explicitBooleanAttributes = ["contenteditable", "draggable"];

const normaliseChildren = (child: HtmlNode[]): Node[] =>
  child.flatMap((child: HtmlNode): Node | Node[] => {
    if (child === undefined) return [];
    if (typeof child === "string") {
      return document.createTextNode(child);
    }
    if (Array.isArray(child)) {
      return child.flatMap((child): Node | Node[] => {
        if (child === undefined) return [];
        if (typeof child === "string") {
          return document.createTextNode(child);
        }
        return child;
      });
    }
    if (child.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      return Array.from(child.childNodes);
    }
    return child;
  });

export const appendHtmlNode = (parent: HTMLElement, ...child: HtmlNode[]) => {
  parent.append(...normaliseChildren(child));
};

export const renderHtmlNode = (parent: HTMLElement, ...child: HtmlNode[]) =>
  parent.replaceChildren(...normaliseChildren(child));

export type Renderer = (child: HtmlNode) => void;
export const createRenderer =
  (parent: HTMLElement): Renderer =>
  (...child: HtmlNode[]) =>
    renderHtmlNode(parent, ...child);

export const setAttributes = <T extends HtmlTag>(
  element: HTMLElementTagNameMap[T],
  attrs: ElementAttributes<T>
) => {
  for (const attrKey of Object.keys(attrs)) {
    const attrVal = attrs[attrKey as keyof ElementAttributes<T>];
    if (attrVal === undefined || attrVal === null) {
      continue; // ignore undefined attributes
    }
    if (attrKey === "id") {
      element.id = attrVal as unknown as string;
    } else if (attrKey === "class") {
      for (const cls of (attrVal as unknown as string).split(" ")) {
        if (cls !== "") element.classList.add(cls);
      }
    } else if (typeof attrVal === "function") {
      const type = attrKey.substr(2).toLowerCase();
      const listener = attrVal as unknown as (event: Event) => void;
      element.addEventListener(type, (e: Event) => listener(e));
    } else if (attrKey === "style") {
      const styles: CSSStyleDeclaration =
        attrVal as unknown as CSSStyleDeclaration;
      for (const styleKey of Object.keys(styles)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        element.style[styleKey] = styles[styleKey as keyof CSSStyleDeclaration];
      }
    } else if (attrKey === "dataSet") {
      const data: DOMStringMap = attrVal as unknown as DOMStringMap;
      for (const key of Object.keys(data)) {
        const value = data[key];
        if (value !== undefined) {
          element.setAttribute("data-" + key, value);
        }
      }
    } else {
      // noinspection SuspiciousTypeOfGuard
      if (typeof attrVal === "boolean") {
        if (attrVal) {
          if (explicitBooleanAttributes.includes(attrKey)) {
            element.setAttribute(attrKey, "true");
          } else {
            element.setAttribute(attrKey, "");
          }
        } else {
          element.removeAttribute(attrKey);
        }
      } else {
        element.setAttribute(attrKey, attrVal as unknown as string);
      }
    }
  }
};

const createElementInt = <T extends HtmlTag>(
  tag: T,
  attrs: ElementAttributes<T>,
  children: HtmlNode[]
): HTMLElementTagNameMap[T] => {
  const is = attrs["is"] as string;
  const element = document.createElement(tag, is ? { is } : undefined);

  setAttributes(element, attrs);
  appendHtmlNode(element, ...children);

  return element as HTMLElementTagNameMap[T];
};

export const createElement = <T extends HtmlTag>(
  tag: T,
  ...props:
    | [attrs: ElementAttributes<T>, ...children: HtmlNode[]]
    | [...children: HtmlNode[]]
): HTMLElement => {
  if (props.length === 0) {
    return createElementInt(tag, {}, []);
  }

  const attrs: ElementAttributes<T> =
    typeof props[0] === "object" &&
    !Array.isArray(props[0]) &&
    !(props[0] instanceof Node)
      ? (props.shift() as ElementAttributes<T>)
      : {};

  return createElementInt(tag, attrs, props as HtmlNode[]);
};

export const createCustomElement = (
  tag: string,
  ...props:
    | [attrs: CustomElementAttributes, ...children: HtmlNode[]]
    | [...children: HtmlNode[]]
): HTMLElement => createElement(tag as "div", ...props);

export const dangerousHtml = (html: string): DocumentFragment => {
  const parent = document.createElement("template");
  parent.innerHTML = html;
  return parent.content;
};

export const createElementFromHtmlString = (html: string): HTMLElement => {
  const children = dangerousHtml(html).childNodes;
  if (children.length !== 1) {
    throw new Error("Expected html with a single root element.");
  }
  return children[0] as HTMLElement;
};
