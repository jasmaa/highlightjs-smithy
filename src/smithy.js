/*
Language: Smithy
Description: Smithy is a language for defining services and SDKs 
Website: https://awslabs.github.io/smithy/
Category: web
*/

module.exports = function (hljs) {
  const MULTILINE_STRING = {
    begin: '"""',
    end: '"""',
    scope: 'string',
    contains: [hljs.BACKSLASH_ESCAPE]
  };

  const IDENTIFIER_RE = /[\w-]+([\.\#][\w-]+)*/;

  const ATTRIBUTE = {
    match: [
      IDENTIFIER_RE,
      /:/,
    ],
    scope: {
      1: 'attr',
    },
  };

  const ELISION_ATTRIBUTE = {
    match: [
      /\$/,
      IDENTIFIER_RE,
    ],
    scope: {
      1: 'keyword',
      2: 'attr',
    },
  };

  const IDENTIFIER = {
    match: IDENTIFIER_RE,
    scope: 'title',
  };

  const LITERAL = {
    match: /true|false|null/,
    scope: 'literal'
  };

  const TRAIT = {
    match: [
      /@/,
      /\w+/,
    ],
    scope: {
      2: 'meta',
    },
  };

  const NODE_CONTENTS = [
    ATTRIBUTE,
    ELISION_ATTRIBUTE,
    LITERAL,
    TRAIT,
    hljs.NUMBER_MODE,
    MULTILINE_STRING,
    hljs.QUOTE_STRING_MODE,
    hljs.C_LINE_COMMENT_MODE,
    IDENTIFIER,
  ];

  const ARRAY_NODE = {
    begin: /\[/,
    end: /\]/,
    contains: [
      ...NODE_CONTENTS,
      'self',
    ],
  };

  const OBJECT_NODE = {
    begin: /{/,
    end: /}/,
    contains: [
      ...NODE_CONTENTS,
      'self',
    ],
  };

  const PARENS_NODE = {
    begin: /\(/,
    end: /\)/,
    contains: [
      OBJECT_NODE,
      ARRAY_NODE,
      ...NODE_CONTENTS,
      'self',
    ]
  };

  const VERSION = {
    match: [
      /\$/,
      /version/,
      /:/,
    ],
    scope: {
      1: 'keyword',
      2: 'attr',
    },
  };

  const NAMESPACE = {
    match: [
      /namespace/,
      /\s+/,
      IDENTIFIER_RE,
    ],
    scope: {
      1: 'keyword',
      3: 'attr',
    },
  };

  const SIMPLE_SHAPE = {
    match: [
      /blob|boolean|string|byte|short|integer|long|float|double|bigInteger|bigDecimal|timestamp|document/,
      /\s+/,
      IDENTIFIER_RE,
    ],
    scope: {
      1: 'keyword',
      3: 'title',
    },
  };

  const AGGREGATE_SHAPE = {
    match: [
      /use|apply|list|set|map|union|structure|service|resource|operation/,
      /\s+/,
      IDENTIFIER_RE,
    ],
    scope: {
      1: 'keyword',
      3: 'title',
    },
  };

  const FOR = {
    match: [
      /for/,
      /\s+/,
      IDENTIFIER_RE,
    ],
    scope: {
      1: 'keyword',
      3: 'title',
    },
  };

  const WITH = {
    match: /with/,
    scope: 'keyword',
  };

  const METADATA = {
    match: /metadata/,
    scope: 'keyword',
  };

  return {
    contains:
      [
        VERSION,
        NAMESPACE,
        AGGREGATE_SHAPE,
        SIMPLE_SHAPE,
        TRAIT,
        FOR,
        WITH,
        METADATA,
        OBJECT_NODE,
        ARRAY_NODE,
        PARENS_NODE,
        hljs.QUOTE_STRING_MODE,
        OBJECT_NODE,
        ARRAY_NODE,
        hljs.C_LINE_COMMENT_MODE,
        IDENTIFIER,
      ]
  }
}