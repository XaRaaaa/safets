const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");

const repoRoot = __dirname.replace(/\\tests$/, "");

const result = spawnSync(
  process.execPath,
  [
    "-e",
    `const path = require('node:path');
const jitiFactory = require(path.join(${JSON.stringify(repoRoot)}, 'node_modules', 'jiti'));
const jiti = jitiFactory(${JSON.stringify(repoRoot)});
process.argv = ['node', path.join(${JSON.stringify(repoRoot)}, 'src', 'index.ts'), path.join(${JSON.stringify(repoRoot)}, 'examples', 'example.ts')];
jiti(path.join(${JSON.stringify(repoRoot)}, 'src', 'index.ts'));`,
  ],
  {
    encoding: "utf8",
  },
);

assert.equal(result.status, 0, result.stderr || result.stdout);
assert.match(result.stdout, /contacts:/);
assert.match(result.stdout, /label: undefined \| string/);

process.stdout.write(result.stdout);