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

  const IDENTIFIER_RE = /[\$\w-]+([\.\#][\$\w-]+)*/;

  const ATTRIBUTE = {
    match: [
      IDENTIFIER_RE,
      /:/,
    ],
    scope: {
      1: 'attr',
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

  const NODE_CONTENTS = [
    ATTRIBUTE,
    LITERAL,
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

  const STATEMENT = {
    match: /namespace|use|apply|metadata/,
    scope: 'keyword',
  };

  const TRAIT_WITH_ARGS = {
    begin: [
      /@/,
      /\w+/,
      /\(/,
    ],
    beginScope: {
      2: 'meta',
    },
    end: /\)/,
    contains: [
      OBJECT_NODE,
      ARRAY_NODE,
      ...NODE_CONTENTS,
    ]
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

  const SIMPLE_SHAPE = {
    match: /blob|boolean|string|byte|short|integer|long|float|double|bigInteger|bigDecimal|timestamp|document/,
    scope: 'keyword',
  };

  const AGGREGATE_SHAPE = {
    begin: [
      /|list|set|map|union|structure|service|resource|operation/,
      /\s+/,
      IDENTIFIER_RE,
      /\s+/,
      /{/,
    ],
    beginScope: {
      1: 'keyword',
      3: 'title',
    },
    end: /}/,
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      TRAIT_WITH_ARGS,
      TRAIT,
      OBJECT_NODE,
      ARRAY_NODE,
      ATTRIBUTE,
      IDENTIFIER,
    ]
  };

  return {
    contains:
      [
        STATEMENT,
        AGGREGATE_SHAPE,
        SIMPLE_SHAPE,
        TRAIT_WITH_ARGS,
        TRAIT,
        hljs.QUOTE_STRING_MODE,
        OBJECT_NODE,
        ARRAY_NODE,
        hljs.C_LINE_COMMENT_MODE,
        IDENTIFIER,
      ]
  }
}