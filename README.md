# Html element builders
Simple helper library to build `HtmlElements` for engineers that know what they are doing.

It constructs html elements using simplified API with a dedicated functions for elements.

- **No compilation**
- **No dependencies**
- **No magic**
- Full typescript support


### Format
```js
createElement(tagName, { attributes }, ...children)
```

Or use can use helper class to create standard html elements
```js
tagName({ attributes }, ...children)
```

### Example
```js
const element = div(
  { class: "my-div", style: { width: "400px", margin: "0 auto" }},
  p("Hello world!"),
  button({ class: "my-button" }, "Click me!")
);

document.appendChild(element);
```

----

Inspired by [hyperscript-helpers](https://github.com/ohanhi/hyperscript-helpers).

License: MIT
