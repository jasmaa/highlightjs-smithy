const fs = require('fs');
const path = require('path');
const hljs = require('highlight.js');
const hljsSmithy = require('../src/smithy.js');

describe('Smithy syntax highlighting', () => {
    beforeAll(() => {
        hljs.registerLanguage('smithy', hljsSmithy);
    })

    it('highlights syntax', async () => {
        const code = fs.readFileSync(path.join(__dirname, 'example.smithy'), 'utf8');
        const result = hljs.highlight(code, {
            language: 'smithy',
        });
        expect(result.value).not.toBeNull();
    });
});