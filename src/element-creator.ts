import type {
  CustomElementAttributes,
  ElementAttributes,
  HtmlNode,
  HtmlTag,
} from "./html-types";

const explicitBooleanAttributes = ["contenteditable", "draggable"];

const normaliseChildren = (children: HtmlNode[]): Node[] => {
  const normalised: Node[] = [];
  for (const child of children) {
    if (child === undefined) continue;
    if (typeof child === "string") {
      normalised.push(document.createTextNode(child));
    } else if (Array.isArray(child)) {
      child.forEach((child) => {
        if (child === undefined) return;
        if (typeof child === "string") {
          normalised.push(document.createTextNode(child));
        } else {
          normalised.push(child);
        }
      });
    } else if (child.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      const grandChildren = (child as DocumentFragment).children;
      for (let i = 0; i < grandChildren.length; i++) {
        normalised.push(grandChildren[i]);
      }
    } else {
      normalised.push(child);
    }
  }
  return normalised;
};

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

const addClasses = (element: Element, classes: string) => {
  for (const cls of classes.split(" ")) {
    if (cls !== "") element.classList.add(cls);
  }
};

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
      if (Array.isArray(attrVal)) {
        for (const cls of attrVal) {
          if (!cls) continue;
          addClasses(element, cls);
        }
      } else {
        addClasses(element, attrVal as unknown as string);
      }
    } else if (typeof attrVal === "function") {
      const type = attrKey.substr(2).toLowerCase();
      const listener = attrVal as unknown as (event: Event) => void;
      element.addEventListener(type, (e: Event) => listener(e));
    } else if (attrKey === "style") {
      // noinspection SuspiciousTypeOfGuard
      if (typeof attrVal === "string") {
        element.style.cssText = attrVal;
      } else {
        const styles: Partial<CSSStyleDeclaration> = attrVal;
        for (const styleKey of Object.keys(styles)) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          element.style[styleKey] =
            styles[styleKey as keyof CSSStyleDeclaration];
        }
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
        if (explicitBooleanAttributes.includes(attrKey)) {
          if (attrVal) {
            element.setAttribute(attrKey, "true");
          } else {
            element.removeAttribute(attrKey);
          }
        } else {
          element.toggleAttribute(attrKey, attrVal);
        }
      } else {
        element.setAttribute(attrKey, attrVal as unknown as string);
      }
    }
  }
};

export const withAttributes = <
  T extends HtmlTag,
  E extends HTMLElementTagNameMap[T]
>(
  element: E,
  attrs: ElementAttributes<T>
): E => {
  setAttributes(element, attrs);
  return element;
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

  const hasArgs =
    typeof props[0] === "object" &&
    !Array.isArray(props[0]) &&
    !(props[0] instanceof Node);

  const attrs: ElementAttributes<T> = hasArgs
    ? (props[0] as ElementAttributes<T>)
    : {};
  const children = (hasArgs ? props.slice(1) : props) as HtmlNode[];

  return createElementInt(tag, attrs, children);
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
