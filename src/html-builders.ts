import { createCustomElement, createElement } from "./element-creator";
import type {
  CustomElementAttributes,
  CustomHtmlTag,
  ElementAttributes,
  HtmlTag,
} from "./html-types";

type TagProps<T extends HtmlTag = HtmlTag> =
  | [ElementAttributes<T>, ...HTMLElement[]]
  | [...HTMLElement[]];

type HtmlElementBuilder<T extends HtmlTag> = (
  ...props: TagProps<T>
) => HTMLElementTagNameMap[T];

const createElementBuilder =
  <T extends HtmlTag>(tag: T): HtmlElementBuilder<T> =>
  (
    ...props: [ElementAttributes<T>, ...HTMLElement[]] | [...HTMLElement[]]
  ): HTMLElementTagNameMap[T] =>
    createElement(tag, ...props) as HTMLElementTagNameMap[T];

export const createCustomElementBuilder =
  (tag: CustomHtmlTag) =>
  (
    ...props: [CustomElementAttributes, ...HTMLElement[]] | [...HTMLElement[]]
  ): HTMLElement =>
    createCustomElement(tag, ...props);

// Standard tags
export const a: HtmlElementBuilder<"a"> = createElementBuilder("a");
export const abbr: HtmlElementBuilder<"abbr"> = createElementBuilder("abbr");
export const address: HtmlElementBuilder<"address"> =
  createElementBuilder("address");
export const area: HtmlElementBuilder<"area"> = createElementBuilder("area");
export const article: HtmlElementBuilder<"article"> =
  createElementBuilder("article");
export const aside: HtmlElementBuilder<"aside"> = createElementBuilder("aside");
export const audio: HtmlElementBuilder<"audio"> = createElementBuilder("audio");
export const b: HtmlElementBuilder<"b"> = createElementBuilder("b");
export const base: HtmlElementBuilder<"base"> = createElementBuilder("base");
export const bdi: HtmlElementBuilder<"bdi"> = createElementBuilder("bdi");
export const bdo: HtmlElementBuilder<"bdo"> = createElementBuilder("bdo");
export const blockquote: HtmlElementBuilder<"blockquote"> =
  createElementBuilder("blockquote");
export const body: HtmlElementBuilder<"body"> = createElementBuilder("body");
export const br: HtmlElementBuilder<"br"> = createElementBuilder("br");
export const button: HtmlElementBuilder<"button"> =
  createElementBuilder("button");
export const canvas: HtmlElementBuilder<"canvas"> =
  createElementBuilder("canvas");
export const caption: HtmlElementBuilder<"caption"> =
  createElementBuilder("caption");
export const cite: HtmlElementBuilder<"cite"> = createElementBuilder("cite");
export const code: HtmlElementBuilder<"code"> = createElementBuilder("code");
export const col: HtmlElementBuilder<"col"> = createElementBuilder("col");
export const colgroup: HtmlElementBuilder<"colgroup"> =
  createElementBuilder("colgroup");
export const data: HtmlElementBuilder<"data"> = createElementBuilder("data");
export const datalist: HtmlElementBuilder<"datalist"> =
  createElementBuilder("datalist");
export const dd: HtmlElementBuilder<"dd"> = createElementBuilder("dd");
export const del: HtmlElementBuilder<"del"> = createElementBuilder("del");
export const details: HtmlElementBuilder<"details"> =
  createElementBuilder("details");
export const dfn: HtmlElementBuilder<"dfn"> = createElementBuilder("dfn");
export const dialog: HtmlElementBuilder<"dialog"> =
  createElementBuilder("dialog");
export const dir: HtmlElementBuilder<"dir"> = createElementBuilder("dir");
export const div: HtmlElementBuilder<"div"> = createElementBuilder("div");
export const dl: HtmlElementBuilder<"dl"> = createElementBuilder("dl");
export const dt: HtmlElementBuilder<"dt"> = createElementBuilder("dt");
export const em: HtmlElementBuilder<"em"> = createElementBuilder("em");
export const embed: HtmlElementBuilder<"embed"> = createElementBuilder("embed");
export const fieldset: HtmlElementBuilder<"fieldset"> =
  createElementBuilder("fieldset");
export const figcaption: HtmlElementBuilder<"figcaption"> =
  createElementBuilder("figcaption");
export const figure: HtmlElementBuilder<"figure"> =
  createElementBuilder("figure");
export const font: HtmlElementBuilder<"font"> = createElementBuilder("font");
export const footer: HtmlElementBuilder<"footer"> =
  createElementBuilder("footer");
export const form: HtmlElementBuilder<"form"> = createElementBuilder("form");
export const h1: HtmlElementBuilder<"h1"> = createElementBuilder("h1");
export const h2: HtmlElementBuilder<"h2"> = createElementBuilder("h2");
export const h3: HtmlElementBuilder<"h3"> = createElementBuilder("h3");
export const h4: HtmlElementBuilder<"h4"> = createElementBuilder("h4");
export const h5: HtmlElementBuilder<"h5"> = createElementBuilder("h5");
export const h6: HtmlElementBuilder<"h6"> = createElementBuilder("h6");
export const head: HtmlElementBuilder<"head"> = createElementBuilder("head");
export const header: HtmlElementBuilder<"header"> =
  createElementBuilder("header");
export const hgroup: HtmlElementBuilder<"hgroup"> =
  createElementBuilder("hgroup");
export const html: HtmlElementBuilder<"html"> = createElementBuilder("html");
export const i: HtmlElementBuilder<"i"> = createElementBuilder("i");
export const iframe: HtmlElementBuilder<"iframe"> =
  createElementBuilder("iframe");
export const img: HtmlElementBuilder<"img"> = createElementBuilder("img");
export const input: HtmlElementBuilder<"input"> = createElementBuilder("input");
export const ins: HtmlElementBuilder<"ins"> = createElementBuilder("ins");
export const kbd: HtmlElementBuilder<"kbd"> = createElementBuilder("kbd");
export const label: HtmlElementBuilder<"label"> = createElementBuilder("label");
export const legend: HtmlElementBuilder<"legend"> =
  createElementBuilder("legend");
export const li: HtmlElementBuilder<"li"> = createElementBuilder("li");
export const link: HtmlElementBuilder<"link"> = createElementBuilder("link");
export const main: HtmlElementBuilder<"main"> = createElementBuilder("main");
export const map: HtmlElementBuilder<"map"> = createElementBuilder("map");
export const mark: HtmlElementBuilder<"mark"> = createElementBuilder("mark");
export const meta: HtmlElementBuilder<"meta"> = createElementBuilder("meta");
export const meter: HtmlElementBuilder<"meter"> = createElementBuilder("meter");
export const nav: HtmlElementBuilder<"nav"> = createElementBuilder("nav");
export const noscript: HtmlElementBuilder<"noscript"> =
  createElementBuilder("noscript");
export const object: HtmlElementBuilder<"object"> =
  createElementBuilder("object");
export const ol: HtmlElementBuilder<"ol"> = createElementBuilder("ol");
export const optgroup: HtmlElementBuilder<"optgroup"> =
  createElementBuilder("optgroup");
export const option: HtmlElementBuilder<"option"> =
  createElementBuilder("option");
export const output: HtmlElementBuilder<"output"> =
  createElementBuilder("output");
export const p: HtmlElementBuilder<"p"> = createElementBuilder("p");
export const param: HtmlElementBuilder<"param"> = createElementBuilder("param");
export const picture: HtmlElementBuilder<"picture"> =
  createElementBuilder("picture");
export const pre: HtmlElementBuilder<"pre"> = createElementBuilder("pre");
export const progress: HtmlElementBuilder<"progress"> =
  createElementBuilder("progress");
export const q: HtmlElementBuilder<"q"> = createElementBuilder("q");
export const rp: HtmlElementBuilder<"rp"> = createElementBuilder("rp");
export const rt: HtmlElementBuilder<"rt"> = createElementBuilder("rt");
export const ruby: HtmlElementBuilder<"ruby"> = createElementBuilder("ruby");
export const s: HtmlElementBuilder<"s"> = createElementBuilder("s");
export const samp: HtmlElementBuilder<"samp"> = createElementBuilder("samp");
export const script: HtmlElementBuilder<"script"> =
  createElementBuilder("script");
export const section: HtmlElementBuilder<"section"> =
  createElementBuilder("section");
export const select: HtmlElementBuilder<"select"> =
  createElementBuilder("select");
export const slot: HtmlElementBuilder<"slot"> = createElementBuilder("slot");
export const small: HtmlElementBuilder<"small"> = createElementBuilder("small");
export const source: HtmlElementBuilder<"source"> =
  createElementBuilder("source");
export const span: HtmlElementBuilder<"span"> = createElementBuilder("span");
export const strong: HtmlElementBuilder<"strong"> =
  createElementBuilder("strong");
export const style: HtmlElementBuilder<"style"> = createElementBuilder("style");
export const sub: HtmlElementBuilder<"sub"> = createElementBuilder("sub");
export const summary: HtmlElementBuilder<"summary"> =
  createElementBuilder("summary");
export const sup: HtmlElementBuilder<"sup"> = createElementBuilder("sup");
export const table: HtmlElementBuilder<"table"> = createElementBuilder("table");
export const tbody: HtmlElementBuilder<"tbody"> = createElementBuilder("tbody");
export const td: HtmlElementBuilder<"td"> = createElementBuilder("td");
export const template: HtmlElementBuilder<"template"> =
  createElementBuilder("template");
export const textarea: HtmlElementBuilder<"textarea"> =
  createElementBuilder("textarea");
export const tfoot: HtmlElementBuilder<"tfoot"> = createElementBuilder("tfoot");
export const th: HtmlElementBuilder<"th"> = createElementBuilder("th");
export const thead: HtmlElementBuilder<"thead"> = createElementBuilder("thead");
export const time: HtmlElementBuilder<"time"> = createElementBuilder("time");
export const title: HtmlElementBuilder<"title"> = createElementBuilder("title");
export const tr: HtmlElementBuilder<"tr"> = createElementBuilder("tr");
export const track: HtmlElementBuilder<"track"> = createElementBuilder("track");
export const u: HtmlElementBuilder<"u"> = createElementBuilder("u");
export const ul: HtmlElementBuilder<"ul"> = createElementBuilder("ul");
export const varTag: HtmlElementBuilder<"var"> = createElementBuilder("var");
export const video: HtmlElementBuilder<"video"> = createElementBuilder("video");
export const wbr: HtmlElementBuilder<"wbr"> = createElementBuilder("wbr");
