const rollup = require("rollup");
const fs = require('fs');
const path = require('path');
const typescript = require("@rollup/plugin-typescript");


const EXCLUDS_DIRS = ['_util']

const toCamelCase = (str) => {
  return str
    .split("-")
    .reduce((a, c) =>a + c.substr(0, 1).toLocaleUpperCase() + c.substr(1), "");
}

async function run() {
  const dirs = fs.readdirSync(path.resolve(__dirname, '../src'));
  const builds = [];
  dirs.forEach(async (name) => {
    if (EXCLUDS_DIRS.includes(name)) {
      return
    }
    builds.push({
      input: path.resolve(__dirname, `../src/${name}/index.ts`),
      output: {
        file: path.resolve(__dirname, `../lib/${name}/index.js`),
        format: "iife",
        name: toCamelCase(name)
      },
      plugins: [typescript()]
    });
    const data = await rollup
      .rollup({
        input: path.resolve(__dirname, `../src/${name}/index.ts`),
        output: {
          file: path.resolve(__dirname, `../lib/${name}/index.js`),
          format: "iife",
          name: toCamelCase(name)
        },
        plugins: [typescript()]
      })
      .then(bundle =>
        bundle.generate({
          file: path.resolve(__dirname, `../lib/${name}/index.js`),
          format: "iife",
          name: toCamelCase(name)
        })
      );
      write(path.resolve(__dirname, `../lib/${name}/index.js`), data.output[0].code);
  })
}

function write(dest, code) {
  return new Promise((resolve, reject) => {
    fs.writeFile(dest, code, err => {
      if (err) return reject(err);
       resolve();
    });
  });
}

run();
