# highlightjs-smithy

[![npm version](https://img.shields.io/npm/v/highlightjs-smithy)](https://www.npmjs.com/highlightjs-smithy)
[![build](https://img.shields.io/github/actions/workflow/status/jasmaa/highlightjs-smithy/build.yml)](https://github.com/jasmaa/highlightjs-smithy/actions)

Highlight.js syntax for Smithy

## Use in browser

Get `hljs-smithy.min.js` from [latest
release](https://github.com/jasmaa/highlightjs-smithy/releases) or build
`hljs-smithy.min.js` with:

```
yarn build
```

Include in HTML page:

```html
<pre>
  <code class="language-smithy">
    Smithy code...
  </code>
</pre>
...
<link rel="stylesheet" href="path/to/theme.css">
<script src="path/to/highlight.min.js"></script>
<script src="path/to/hljs-smithy.min.js"></script>
<script>
  hljs.registerLanguage('smithy', hljsSmithy);
  hljs.highlightAll();
</script>
```

## Use in Node

Install packages:

```
npm install highlight.js
npm install highlightjs-smithy
```

Import modules in Node:

```js
const hljs = require('highlight.js');
const hljsSmithy = require('highlightjs-smithy');

const code = `
namespace example.weather

service Weather {
    version: "2006-03-01",
    resources: [City],
    operations: [GetCurrentTime]
}

resource City {
    identifiers: { cityId: CityId },
    read: GetCity,
    list: ListCities,
    resources: [Forecast],
}
`;

hljs.registerLanguage('smithy', hljsSmithy);
const result = hljs.highlight(code, {
  language: 'smithy',
});
```