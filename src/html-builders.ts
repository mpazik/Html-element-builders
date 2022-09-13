import { createElement } from "./element-creator";
import type { ElementAttributes, HtmlTag } from "./html-types";

type TagProps<T extends HtmlTag = HtmlTag> =
  | [ElementAttributes<T>, ...HTMLElement[]]
  | [...HTMLElement[]];

type HtmlElementBuilder<T extends HtmlTag> = (
  ...props: TagProps<T>
) => HTMLElementTagNameMap[T];

const createTagFactory =
  <T extends HtmlTag>(tag: T): HtmlElementBuilder<T> =>
  (
    ...props: [ElementAttributes<T>, ...HTMLElement[]] | [...HTMLElement[]]
  ): HTMLElementTagNameMap[T] =>
    createElement(tag, ...props) as HTMLElementTagNameMap[T];

// Standard tags
export const a: HtmlElementBuilder<"a"> = createTagFactory("a");
export const abbr: HtmlElementBuilder<"abbr"> = createTagFactory("abbr");
export const address: HtmlElementBuilder<"address"> =
  createTagFactory("address");
export const area: HtmlElementBuilder<"area"> = createTagFactory("area");
export const article: HtmlElementBuilder<"article"> =
  createTagFactory("article");
export const aside: HtmlElementBuilder<"aside"> = createTagFactory("aside");
export const audio: HtmlElementBuilder<"audio"> = createTagFactory("audio");
export const b: HtmlElementBuilder<"b"> = createTagFactory("b");
export const base: HtmlElementBuilder<"base"> = createTagFactory("base");
export const bdi: HtmlElementBuilder<"bdi"> = createTagFactory("bdi");
export const bdo: HtmlElementBuilder<"bdo"> = createTagFactory("bdo");
export const blockquote: HtmlElementBuilder<"blockquote"> =
  createTagFactory("blockquote");
export const body: HtmlElementBuilder<"body"> = createTagFactory("body");
export const br: HtmlElementBuilder<"br"> = createTagFactory("br");
export const button: HtmlElementBuilder<"button"> = createTagFactory("button");
export const canvas: HtmlElementBuilder<"canvas"> = createTagFactory("canvas");
export const caption: HtmlElementBuilder<"caption"> =
  createTagFactory("caption");
export const cite: HtmlElementBuilder<"cite"> = createTagFactory("cite");
export const code: HtmlElementBuilder<"code"> = createTagFactory("code");
export const col: HtmlElementBuilder<"col"> = createTagFactory("col");
export const colgroup: HtmlElementBuilder<"colgroup"> =
  createTagFactory("colgroup");
export const data: HtmlElementBuilder<"data"> = createTagFactory("data");
export const datalist: HtmlElementBuilder<"datalist"> =
  createTagFactory("datalist");
export const dd: HtmlElementBuilder<"dd"> = createTagFactory("dd");
export const del: HtmlElementBuilder<"del"> = createTagFactory("del");
export const details: HtmlElementBuilder<"details"> =
  createTagFactory("details");
export const dfn: HtmlElementBuilder<"dfn"> = createTagFactory("dfn");
export const dialog: HtmlElementBuilder<"dialog"> = createTagFactory("dialog");
export const dir: HtmlElementBuilder<"dir"> = createTagFactory("dir");
export const div: HtmlElementBuilder<"div"> = createTagFactory("div");
export const dl: HtmlElementBuilder<"dl"> = createTagFactory("dl");
export const dt: HtmlElementBuilder<"dt"> = createTagFactory("dt");
export const em: HtmlElementBuilder<"em"> = createTagFactory("em");
export const embed: HtmlElementBuilder<"embed"> = createTagFactory("embed");
export const fieldset: HtmlElementBuilder<"fieldset"> =
  createTagFactory("fieldset");
export const figcaption: HtmlElementBuilder<"figcaption"> =
  createTagFactory("figcaption");
export const figure: HtmlElementBuilder<"figure"> = createTagFactory("figure");
export const font: HtmlElementBuilder<"font"> = createTagFactory("font");
export const footer: HtmlElementBuilder<"footer"> = createTagFactory("footer");
export const form: HtmlElementBuilder<"form"> = createTagFactory("form");
export const h1: HtmlElementBuilder<"h1"> = createTagFactory("h1");
export const h2: HtmlElementBuilder<"h2"> = createTagFactory("h2");
export const h3: HtmlElementBuilder<"h3"> = createTagFactory("h3");
export const h4: HtmlElementBuilder<"h4"> = createTagFactory("h4");
export const h5: HtmlElementBuilder<"h5"> = createTagFactory("h5");
export const h6: HtmlElementBuilder<"h6"> = createTagFactory("h6");
export const head: HtmlElementBuilder<"head"> = createTagFactory("head");
export const header: HtmlElementBuilder<"header"> = createTagFactory("header");
export const hgroup: HtmlElementBuilder<"hgroup"> = createTagFactory("hgroup");
export const html: HtmlElementBuilder<"html"> = createTagFactory("html");
export const i: HtmlElementBuilder<"i"> = createTagFactory("i");
export const iframe: HtmlElementBuilder<"iframe"> = createTagFactory("iframe");
export const img: HtmlElementBuilder<"img"> = createTagFactory("img");
export const input: HtmlElementBuilder<"input"> = createTagFactory("input");
export const ins: HtmlElementBuilder<"ins"> = createTagFactory("ins");
export const kbd: HtmlElementBuilder<"kbd"> = createTagFactory("kbd");
export const label: HtmlElementBuilder<"label"> = createTagFactory("label");
export const legend: HtmlElementBuilder<"legend"> = createTagFactory("legend");
export const li: HtmlElementBuilder<"li"> = createTagFactory("li");
export const link: HtmlElementBuilder<"link"> = createTagFactory("link");
export const main: HtmlElementBuilder<"main"> = createTagFactory("main");
export const map: HtmlElementBuilder<"map"> = createTagFactory("map");
export const mark: HtmlElementBuilder<"mark"> = createTagFactory("mark");
export const meta: HtmlElementBuilder<"meta"> = createTagFactory("meta");
export const meter: HtmlElementBuilder<"meter"> = createTagFactory("meter");
export const nav: HtmlElementBuilder<"nav"> = createTagFactory("nav");
export const noscript: HtmlElementBuilder<"noscript"> =
  createTagFactory("noscript");
export const object: HtmlElementBuilder<"object"> = createTagFactory("object");
export const ol: HtmlElementBuilder<"ol"> = createTagFactory("ol");
export const optgroup: HtmlElementBuilder<"optgroup"> =
  createTagFactory("optgroup");
export const option: HtmlElementBuilder<"option"> = createTagFactory("option");
export const output: HtmlElementBuilder<"output"> = createTagFactory("output");
export const p: HtmlElementBuilder<"p"> = createTagFactory("p");
export const param: HtmlElementBuilder<"param"> = createTagFactory("param");
export const picture: HtmlElementBuilder<"picture"> =
  createTagFactory("picture");
export const pre: HtmlElementBuilder<"pre"> = createTagFactory("pre");
export const progress: HtmlElementBuilder<"progress"> =
  createTagFactory("progress");
export const q: HtmlElementBuilder<"q"> = createTagFactory("q");
export const rp: HtmlElementBuilder<"rp"> = createTagFactory("rp");
export const rt: HtmlElementBuilder<"rt"> = createTagFactory("rt");
export const ruby: HtmlElementBuilder<"ruby"> = createTagFactory("ruby");
export const s: HtmlElementBuilder<"s"> = createTagFactory("s");
export const samp: HtmlElementBuilder<"samp"> = createTagFactory("samp");
export const script: HtmlElementBuilder<"script"> = createTagFactory("script");
export const section: HtmlElementBuilder<"section"> =
  createTagFactory("section");
export const select: HtmlElementBuilder<"select"> = createTagFactory("select");
export const slot: HtmlElementBuilder<"slot"> = createTagFactory("slot");
export const small: HtmlElementBuilder<"small"> = createTagFactory("small");
export const source: HtmlElementBuilder<"source"> = createTagFactory("source");
export const span: HtmlElementBuilder<"span"> = createTagFactory("span");
export const strong: HtmlElementBuilder<"strong"> = createTagFactory("strong");
export const style: HtmlElementBuilder<"style"> = createTagFactory("style");
export const sub: HtmlElementBuilder<"sub"> = createTagFactory("sub");
export const summary: HtmlElementBuilder<"summary"> =
  createTagFactory("summary");
export const sup: HtmlElementBuilder<"sup"> = createTagFactory("sup");
export const table: HtmlElementBuilder<"table"> = createTagFactory("table");
export const tbody: HtmlElementBuilder<"tbody"> = createTagFactory("tbody");
export const td: HtmlElementBuilder<"td"> = createTagFactory("td");
export const template: HtmlElementBuilder<"template"> =
  createTagFactory("template");
export const textarea: HtmlElementBuilder<"textarea"> =
  createTagFactory("textarea");
export const tfoot: HtmlElementBuilder<"tfoot"> = createTagFactory("tfoot");
export const th: HtmlElementBuilder<"th"> = createTagFactory("th");
export const thead: HtmlElementBuilder<"thead"> = createTagFactory("thead");
export const time: HtmlElementBuilder<"time"> = createTagFactory("time");
export const title: HtmlElementBuilder<"title"> = createTagFactory("title");
export const tr: HtmlElementBuilder<"tr"> = createTagFactory("tr");
export const track: HtmlElementBuilder<"track"> = createTagFactory("track");
export const u: HtmlElementBuilder<"u"> = createTagFactory("u");
export const ul: HtmlElementBuilder<"ul"> = createTagFactory("ul");
export const varTag: HtmlElementBuilder<"var"> = createTagFactory("var");
export const video: HtmlElementBuilder<"video"> = createTagFactory("video");
export const wbr: HtmlElementBuilder<"wbr"> = createTagFactory("wbr");
