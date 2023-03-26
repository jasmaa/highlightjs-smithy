const fs = require('fs');
const path = require('path');
const hljs = require('highlight.js');
const hljsSmithy = require('../src/smithy.js');

const filePaths = [
    'basic/elision-attribute.smithy',
    'basic/list.smithy',
    'basic/map.smithy',
    'basic/metadata-1.smithy',
    'basic/metadata-2.smithy',
    'basic/metadata-3.smithy',
    'basic/operation.smithy',
    'basic/resource-1.smithy',
    'basic/resource-2.smithy',
    'basic/service.smithy',
    'basic/set.smithy',
    'basic/simple-shapes.smithy',
    'basic/structure-1.smithy',
    'basic/structure-2.smithy',
    'basic/structure-spacing.smithy',
    'basic/trait-apply.smithy',
    'basic/trait.smithy',
    'basic/union.smithy',
    'complex/weather.smithy',
];

describe('Smithy syntax highlighting', () => {
    beforeAll(() => {
        hljs.registerLanguage('smithy', hljsSmithy);
    });

    test.each(filePaths)('highlights syntax for %s', (filePath) => {
        const code = fs.readFileSync(path.join(__dirname, filePath), 'utf8');
        const result = hljs.highlight(code, {
            language: 'smithy',
        });
        expect(result.value).toMatchSnapshot();
    });
});