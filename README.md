# highlightjs-smithy

Highlight.js syntax for Smithy

## Usage

Build `hljs-smithy.min.js` with:

```
yarn build
```

Include in HTML page:

```html
<link rel="stylesheet" href="path/to/theme.css">
<script src="path/to/highlight.min.js"></script>
<script src="path/to/hljs-smithy.min.js"></script>
<script>
  hljs.registerLanguage('smithy', hljsSmithy);
  hljs.highlightAll();
</script>
```