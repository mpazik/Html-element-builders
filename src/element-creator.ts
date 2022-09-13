import type {
  CustomElementAttributes,
  ElementAttributes,
  HtmlTag,
} from "./html-types";

const explicitBooleanAttributes = ["contenteditable", "draggable"];

type Child = HTMLElement | string;

const createElementInt = <T extends HtmlTag>(
  tag: T,
  attrs: ElementAttributes<T>,
  children: Node[]
): HTMLElementTagNameMap[T] => {
  const is = attrs["is"] as string;
  const node = document.createElement(tag, is ? { is } : undefined);

  for (const attrKey of Object.keys(attrs)) {
    const attrVal = attrs[attrKey as keyof ElementAttributes<T>];
    if (attrVal === undefined || attrVal === null) {
      continue; // ignore undefined attributes
    }
    if (attrKey === "id") {
      node.id = attrVal as unknown as string;
    } else if (attrKey === "class") {
      for (const cls of (attrVal as unknown as string).split(" ")) {
        if (cls !== "") node.classList.add(cls);
      }
    } else if (typeof attrVal === "function") {
      const type = attrKey.substr(2).toLowerCase();
      const listener = attrVal as unknown as (event: Event) => void;
      node.addEventListener(type, (e: Event) => listener(e));
    } else if (attrKey === "style") {
      const styles: CSSStyleDeclaration =
        attrVal as unknown as CSSStyleDeclaration;
      for (const styleKey of Object.keys(styles)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        node.style[styleKey] = styles[styleKey as keyof CSSStyleDeclaration];
      }
    } else if (attrKey === "dataSet") {
      const data: DOMStringMap = attrVal as unknown as DOMStringMap;
      for (const key of Object.keys(data)) {
        const value = data[key];
        if (value !== undefined) {
          node.setAttribute("data-" + key, value);
        }
      }
    } else {
      // noinspection SuspiciousTypeOfGuard
      if (typeof attrVal === "boolean") {
        if (attrVal) {
          if (explicitBooleanAttributes.includes(attrKey)) {
            node.setAttribute(attrKey, "true");
          } else {
            node.setAttribute(attrKey, "");
          }
        } else {
          node.removeAttribute(attrKey);
        }
      } else {
        node.setAttribute(attrKey, attrVal as unknown as string);
      }
    }
  }

  children.forEach((child) => node.appendChild(child));

  return node as HTMLElementTagNameMap[T];
};

const normaliseChild = (child: Child): Node => {
  if (typeof child === "string") {
    return document.createTextNode(child);
  }
  return child;
};

export const createElement = <T extends HtmlTag>(
  tag: T,
  ...props:
    | [attrs: ElementAttributes<T>, ...children: Child[]]
    | [...children: Child[]]
): HTMLElement => {
  if (props.length === 0) {
    return createElementInt(tag, {}, []);
  }
  const attrs: ElementAttributes<T> =
    typeof props[0] === "object" && !Array.isArray(props[0])
      ? (props.shift() as ElementAttributes<T>)
      : {};

  return createElementInt(tag, attrs, (props as Child[]).map(normaliseChild));
};

export const createCustomElement = (
  tag: string,
  ...props:
    | [attrs: CustomElementAttributes, ...children: Child[]]
    | [...children: Child[]]
): HTMLElement => createElement(tag as "div", ...props);

export const createElementFromHtmlString = (html: string): HTMLElement => {
  const parent = document.createElement("template");
  parent.innerHTML = html;
  const children = parent.content.childNodes;
  if (children.length !== 1) {
    throw new Error("Expected html with a single root element.");
  }
  return children[0] as HTMLElement;
};
